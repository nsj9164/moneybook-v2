import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const authHeader = req.headers.get("Authorization") ?? "";
  const jwt = authHeader.replace("Bearer ", "");
  const {
    data: { user },
    error: getUserErr,
  } = await supabase.auth.getUser(jwt);
  if (getUserErr || !user) return new Response("Unauthorized", { status: 401 });

  const userId = user.id;

  // 데이터 삭제
  const { error: delAppErr } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (delAppErr)
    return new Response(`App data delete failed: ${delAppErr.message}`, {
      status: 500,
    });

  // Auth 사용자 삭제
  const { error: delAuthErr } = await supabase.auth.admin.deleteUser(userId);
  if (delAuthErr)
    return new Response(`Auth delete failed: ${delAuthErr.message}`, {
      status: 500,
    });

  return new Response(null, { status: 204 });
});
