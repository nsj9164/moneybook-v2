// supabase/functions/delete-account/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import {
  createClient,
  type User,
} from "https://esm.sh/@supabase/supabase-js@2";

const ALLOW_ORIGINS = ["http://localhost:5173"];
const ALLOW_HEADERS = "authorization, content-type, apikey, x-client-info";

type HeadersMap = Record<string, string>;

const json = (body: unknown, status: number, headers: HeadersMap) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

const noContent = (headers: HeadersMap) =>
  new Response(null, { status: 204, headers });

const makeCors = (origin: string): HeadersMap => {
  const allowOrigin = ALLOW_ORIGINS.includes(origin) ? origin : "null";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": ALLOW_HEADERS,
    "Access-Control-Max-Age": "86400",
    Vary: "Origin, Access-Control-Request-Headers, Access-Control-Request-Method",
  };
};
const getEnv = (k1: string, k2?: string) => {
  const v = Deno.env.get(k1) ?? (k2 ? Deno.env.get(k2) : undefined);
  if (!v)
    throw new Error(`Supabase env var missing: ${k1}${k2 ? `|${k2}` : ""}`);
  return v;
};

const parseBearer = (req: Request) => {
  const a = req.headers.get("Authorization") ?? "";
  return a.toLowerCase().startsWith("bearer ") ? a.slice(7).trim() : "";
};

async function getUserByToken(
  url: string,
  anon: string,
  token: string
): Promise<User> {
  const userClient = createClient(url, anon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false },
  });
  const { data, error } = await userClient.auth.getUser();
  if (error || !data?.user) throw new Error("Unauthorized");
  return data.user;
}

serve(async (req) => {
  const cors = makeCors(req.headers.get("origin") ?? "");

  if (req.method === "OPTIONS") return noContent(cors);
  if (req.method !== "POST")
    return json({ error: "Method Not Allowed" }, 405, cors);

  try {
    const URL = getEnv("SUPABASE_URL", "SB_URL");
    const ANON = getEnv("SUPABASE_ANON_KEY", "SB_ANON_KEY");
    const SVC = getEnv("SUPABASE_SERVICE_ROLE_KEY", "SB_SERVICE_ROLE_KEY");

    const token = parseBearer(req);
    if (!token) return json({ error: "Unauthorized" }, 401, cors);

    const user = await getUserByToken(URL, ANON, token);

    const email = user.email;
    const provider = (user.app_metadata as any)?.provider;
    if (!email || !provider)
      return json({ error: "Missing email or provider" }, 400, cors);

    const admin = createClient(URL, SVC, { auth: { persistSession: false } });

    // 앱 데이터 삭제
    const { error: appErr } = await admin
      .from("users")
      .delete()
      .eq("email", email)
      .eq("provider", provider);

    if (appErr) {
      console.error("App data delete failed:", appErr);
      return json({ error: appErr.message }, 500, cors);
    }

    // Auth 유저 삭제
    const { error: authErr } = await admin.auth.admin.deleteUser(user.id);
    if (authErr) {
      console.error("Auth delete failed:", authErr);
      return json({ error: authErr.message }, 500, cors);
    }

    return noContent(cors);
  } catch (e) {
    console.error("Unhandled delete-account error:", e);
    return json({ error: (e as Error).message || "Internal Error" }, 500, cors);
  }
});
