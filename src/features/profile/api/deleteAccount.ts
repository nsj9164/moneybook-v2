import { supabase } from "@/utils/supabase";

export const deleteAccount = async (): Promise<void> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error || !session) throw new Error("세션이 없습니다.");

  const { error: fnError } = await supabase.functions.invoke("delete-account", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (fnError) throw new Error(fnError.message);

  await supabase.auth.signOut();
};
