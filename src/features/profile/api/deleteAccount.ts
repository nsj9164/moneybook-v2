import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";

export const deleteAccount = async (): Promise<void> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  if (!session?.access_token) throw new Error("세션이 없습니다.");

  const res = await fetch("/functions/v1/delete-account", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ confirm: true }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || "계정 삭제 실패");
  }

  if (session?.user) {
    const { data, error } = await supabase.auth.admin.deleteUser(
      session?.user.id
    );
  }

  const { userId } = useAuth();

  if (userId) {
    await supabase.from("users").delete().eq("id", userId);
  }
};
