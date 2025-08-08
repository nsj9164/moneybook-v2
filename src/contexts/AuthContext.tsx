import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/utils/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UUID } from "@/types/ids";
import toast from "react-hot-toast";
import { getOrCreateUser } from "@/features/auth/api/user";

interface User {
  id: UUID;
  email: string;
  name?: string;
  profileImage?: string;
  provider: string;
}

interface AuthContextType {
  user: User | null;
  userId: UUID | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = user?.id ?? null;
  const isAuthenticated = !!user;

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const loadUser = async (
    supabaseUser: SupabaseUser | null,
    isNewLogin: boolean
  ) => {
    if (!supabaseUser) {
      setUser(null);
      return;
    }

    // 새로 로그인한 경우에만 getOrCreateUser 호출
    if (isNewLogin) {
      const result = await getOrCreateUser(supabaseUser);

      if (!result) {
        toast.error("사용자 정보를 불러오지 못했습니다.");
        setUser(null);
      } else {
        setUser(result);
      }
    } else {
      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email ?? "",
        provider: supabaseUser.app_metadata?.provider ?? "unknown",
        name:
          supabaseUser.user_metadata?.full_name ||
          supabaseUser.user_metadata?.name,
        profileImage: supabaseUser.user_metadata?.avatar_url || "",
      });
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          loadUser(session.user, false);
        }
      } catch (err) {
        console.error("초기 세션 로드 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    // auth 상태 변화 시 유저 정보 업데이트
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);

        if (session?.user) {
          if (event === "SIGNED_IN") {
            loadUser(session.user, false);
          } else if (event === "INITIAL_SESSION") {
            if (!user) {
              await loadUser(session.user, true);
            }
          }
        }

        setIsLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      userId,
      isAuthenticated,
      isLoading,
      logout,
    }),
    [user, userId, isAuthenticated, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
