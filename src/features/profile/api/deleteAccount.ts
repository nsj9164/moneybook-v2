// deleteAccount.ts — (선택) invoke 대신 fetch로 더 안정적으로
export const deleteAccount = async (accessToken: string): Promise<void> => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const res = await fetch(`${supabaseUrl}/functions/v1/delete-account`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      apikey: anonKey, // 권장
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `delete-account failed: ${res.status}`);
  }
};
