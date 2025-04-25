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
  const navigate = useNavigate();
  const providerRef = useRef<string | null>(null);
  const hasInsertedRef = useRef(false);

  const loginWithGoogle = async () => {
    sessionStorage.setItem("provider", "google");
    console.log("sessionStorage:::", sessionStorage.getItem("provider"));
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
    sessionStorage.setItem("provider", "kakao");
    console.log("sessionStorage:::", sessionStorage.getItem("provider"));
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

  const parseSupabaseUser = (user: SupabaseUser, provider: string): User => ({
    id: user.id,
    email: user.email ?? "",
    name: user.user_metadata?.name ?? user.user_metadata?.full_name,
    profileImage:
      user.user_metadata?.avatar_url ??
      user.user_metadata?.picture ??
      undefined,
    provider,
  });

  const checkProviderConflict = async (
    email: string,
    currentProvider: string
  ) => {
    const { data } = await supabase
      .from("users")
      .select("provider")
      .eq("email", email)
      .maybeSingle();

    if (data && data.provider !== currentProvider) {
      alert(`이미 ${data.provider} 계정으로 가입되어 있습니다.`);
      await supabase.auth.signOut();
      navigate("/login", { replace: true });
      return true;
    }

    return false;
  };

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
    provider: string,
    isFirstLogin: boolean
  ) => {
    const newUser = parseSupabaseUser(userData, provider);
    setUser(newUser);
    setIsAuthenticated(true);

    const conflict = await checkProviderConflict(newUser.email, provider);
    if (conflict) return;

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

      const { data, error } = await supabase
        .from("users")
        .select("provider")
        .eq("email", userData.email)
        .maybeSingle();

      if (error) {
        console.error("User fetch error:", error.message);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const sessionProvider = sessionStorage.getItem("provider");
      const dbProvider = data?.provider ?? "unknown";

      console.log("Session Provider:", sessionProvider);
      console.log("DB Provider:", dbProvider);
      console.log(
        "sessionProvider !== dbProvider",
        sessionProvider !== dbProvider
      );

      if (sessionProvider && sessionProvider !== dbProvider) {
        alert(`이미 ${dbProvider} 계정으로 가입되어 있습니다.`);
        await supabase.auth.signOut();
        navigate("/login");
        return;
      }

      await handleAuthenticatedUser(userData, dbProvider, false);
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

        console.log("sessionStorage:::", sessionStorage.getItem("provider"));
        const provider = sessionStorage.getItem("provider") ?? "unknown";
        sessionStorage.removeItem("provider");

        const isFirstLogin = session?.user?.identities?.length === 1;

        await handleAuthenticatedUser(userData, provider, isFirstLogin);
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
