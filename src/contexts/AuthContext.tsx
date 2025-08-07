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
import { getOrCreateUser } from "@/features/auth/api/user";
import toast from "react-hot-toast";

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
  // loginWithGoogle: () => void;
  // loginWithKakao: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = user?.id ?? null;
  const isAuthenticated = !!user;

  // const loginWithProvider = async (provider: "google" | "kakao") => {
  //   console.log("######", provider);
  //   try {
  //     await supabase.auth.signOut({ scope: "global" }); // 🔥 기존 세션 제거
  //     console.log("signOut 성공!");
  //     await supabase.auth.signInWithOAuth({
  //       provider,
  //       options: {
  //         queryParams: { access_type: "offline", prompt: "consent" },
  //         redirectTo: `${window.location.origin}/auth/callback?provider=${provider}`,
  //       },
  //     });
  //     console.log("signInWithOAuth 성공!");
  //   } catch (err) {
  //     console.error("OAuth 로그인 실패:", err);
  //     throw err; // 🔥 LoginForm에서 catch로 처리하도록 re-throw
  //   }
  // };

  // const loginWithGoogle = () => loginWithProvider("google");
  // const loginWithKakao = () => loginWithProvider("kakao");

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  };

  const loadUser = async (supabaseUser: SupabaseUser | null) => {
    console.log("loadUser 실행됨 - SupabaseUser:", supabaseUser);
    if (!supabaseUser) {
      setUser(null);
      return;
    }

    try {
      const result = await getOrCreateUser(supabaseUser);
      console.log("getOrCreateUser 반환값:", result);
      if (!result) {
        toast.error("사용자 정보를 불러오지 못했습니다.");
        setUser(null);
      } else {
        console.log("###result:::", result);
        setUser(result);
      }
    } catch (err) {
      console.error("loadUser 오류:", err);
      toast.error("사용자 정보 로드 실패");
      setUser(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        await loadUser(session?.user ?? null);
      } catch (err) {
        console.error("초기 세션 로드 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setIsLoading(true);
        await loadUser(session?.user ?? null);
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
