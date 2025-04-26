import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/utils/supabase";
import { useNavigate } from "react-router-dom";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

interface User {
  id: string;
  email: string;
  name?: string;
  profileImage?: string;
  provider: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithKakao: () => void;
  loginWithGoogle: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasInsertedRef = useRef(false);

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?provider=google`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (error) console.error("Google login error: ", error.message);
  };

  const loginWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?provider=kakao`,
      },
    });
    if (error) console.error("Kakao login error:", error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  const parseSupabaseUser = (user: SupabaseUser): User => ({
    id: user.id,
    email: user.email ?? "",
    name: user.user_metadata?.name ?? user.user_metadata?.full_name,
    profileImage:
      user.user_metadata?.avatar_url ??
      user.user_metadata?.picture ??
      undefined,
    provider: user.app_metadata.proverder,
  });

  const insertDB = async ({
    id,
    email,
    name,
    profileImage,
    provider,
  }: User) => {
    const { error } = await supabase
      .from("users")
      .insert({ email, name, profile_image: profileImage, provider });

    if (error) console.error("User Insert error: ", error.message);
  };

  const handleAuthenticatedUser = async (
    userData: SupabaseUser,
    isFirstLogin: boolean
  ) => {
    const newUser = parseSupabaseUser(userData);
    setUser(newUser);
    setIsAuthenticated(true);

    if (isFirstLogin && !hasInsertedRef.current) {
      hasInsertedRef.current = true;
      await insertDB(newUser);
    }
  };

  // 로그인 상태 추적
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userData = session?.user;

      if (!userData) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      await handleAuthenticatedUser(userData, false);
      setIsLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const userData = session?.user;

        if (!userData) {
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const isFirstLogin = session?.user?.identities?.length === 1;

        await handleAuthenticatedUser(userData, isFirstLogin);
        setIsLoading(false);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        loginWithGoogle,
        loginWithKakao,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
