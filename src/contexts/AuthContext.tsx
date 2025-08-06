import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/utils/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UUID } from "@/types/ids";
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
  loginWithGoogle: () => void;
  loginWithKakao: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loginWithProvider = async (provider: "google" | "kakao") => {
    await supabase.auth.signOut({ scope: "global" });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?provider=${provider}`,
      },
    });

    if (error) {
      console.error("❌ OAuth error", error.message);
    } else {
      console.log("✅ OAuth redirect initiated", data);
    }
  };

  const loginWithGoogle = () => loginWithProvider("google");
  const loginWithKakao = () => loginWithProvider("kakao");

  const logout = async () => {
    await supabase.auth.signOut({ scope: "global" });
    setUser(null);
    setIsAuthenticated(false);
    window.location.reload();
  };

  const syncUserSession = async (supabaseUser: SupabaseUser | null) => {
    if (!supabaseUser) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    const result = await getOrCreateUser(supabaseUser);

    if (!result) {
      setUser(null);
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    setUser(result);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await syncUserSession(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userId: user ? user.id : null,
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
