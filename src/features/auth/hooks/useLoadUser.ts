import { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";
import { getOrCreateUser } from "../api/user";
import { ProviderType, User } from "../types/auth";

export const loadUser = async (
  supabaseUser: SupabaseUser | null,
  loginProvider: ProviderType,
  setUser: (user: User | null) => void,
  isNewLogin: boolean
) => {
  if (!supabaseUser) {
    setUser(null);
    return;
  }

  const createdAt = supabaseUser.user_metadata?.created_at;
  // 새로 로그인한 경우에만 getOrCreateUser 호출
  if (isNewLogin) {
    const result = await getOrCreateUser(supabaseUser, loginProvider);

    if (!result) {
      toast.error("사용자 정보를 불러오지 못했습니다.");
      setUser(null);
    } else {
      setUser({ ...result, provider: loginProvider, createdAt });
    }
  } else {
    setUser({
      id: supabaseUser.id,
      email: supabaseUser.email ?? "",
      provider: loginProvider,
      name:
        supabaseUser.user_metadata?.full_name ||
        supabaseUser.user_metadata?.name,
      profileImage: supabaseUser.user_metadata?.avatar_url || "",
      createdAt,
    });
  }
};
