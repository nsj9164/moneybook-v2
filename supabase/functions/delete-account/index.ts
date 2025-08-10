import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOW_ORIGINS = ["http://localhost:5173"];
console.log("index도착!!!");

serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const allowOrigin = ALLOW_ORIGINS.includes(origin) ? origin : "null";

  const requestedHeaders =
    req.headers.get("Access-Control-Request-Headers") ??
    "authorization, content-type, apikey, x-client-info";

  const cors = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": requestedHeaders,
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("SB_URL");
    const SUPABASE_ANON_KEY =
      Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SB_ANON_KEY");
    const SERVICE_ROLE_KEY =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
      Deno.env.get("SB_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !SUPABASE_ANON_KEY) {
      console.error("Missing envs", {
        hasUrl: !!SUPABASE_URL,
        hasAnon: !!SUPABASE_ANON_KEY,
        hasService: !!SERVICE_ROLE_KEY,
      });
      return new Response(
        "Config error: Missing SUPABASE_* envs on Edge Function",
        { status: 500, headers: cors }
      );
    }

    // Authorization 헤더 필수
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response("Unauthorized: no bearer token", {
        status: 401,
        headers: cors,
      });
    }
    const jwt = authHeader.replace("Bearer ", "").trim();

    // 유저 토큰 검증용(anon) 클라이언트
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
      auth: { persistSession: false },
    });

    // 토큰으로 사용자 확인
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) {
      console.error("auth.getUser failed", userErr);
      return new Response("Unauthorized", { status: 401, headers: cors });
    }
    const userId = userData.user.id;

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // 앱 데이터 정리
    const { error: appErr } = await admin
      .from("users")
      .delete()
      .eq("id", userId);
    if (appErr) {
      console.error("Delete app data failed", appErr);
      return new Response(`App data delete failed: ${appErr.message}`, {
        status: 500,
        headers: cors,
      });
    }

    // Auth 사용자 삭제
    const { error: authErr } = await userClient.auth.admin.deleteUser(userId);
    if (authErr)
      return new Response(`Auth delete failed: ${authErr.message}`, {
        status: 500,
        headers: cors,
      });

    return new Response(null, { status: 204, headers: cors });
  } catch (e) {
    console.error("Unhandled error", e);
    return new Response(`Internal Error: ${(e as Error).message}`, {
      status: 500,
      headers: cors,
    });
  }
});
