import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/utils/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface User {
  id?: string;
  email: string;
  name?: string;
  profileImage?: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
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

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error("Google login error:", error.message);
  };

  const loginWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error("Kakao login error:", error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleAuthChange = async (userData: SupabaseUser | null) => {
    if (!userData) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    const newUser: User = {
      email: userData.email ?? "",
      name: userData.user_metadata?.name ?? userData.user_metadata?.full_name,
      profileImage:
        userData.user_metadata?.avatar_url ||
        userData.user_metadata?.picture ||
        undefined,
      provider: userData.app_metadata?.provider ?? "unknown",
    };

    let userId: string | undefined;

    const existingUser = await checkIfUserExists(
      newUser.email,
      newUser.provider
    );

    if (!existingUser) {
      const { data, error } = await supabase
        .from("users")
        .insert({
          email: newUser.email,
          name: newUser.name,
          profile_image: newUser.profileImage,
          provider: newUser.provider,
        })
        .select("id");

      if (error) {
        console.error("Insert error:", error.message);
      }

      if (data && data.length > 0) {
        userId = data[0].id;
      }
    } else {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", newUser.email)
        .eq("provider", newUser.provider)
        .limit(1);

      if (error) {
        console.error("Select existing user id error:", error.message);
      }

      if (data && data.length > 0) {
        userId = data[0].id;
      }
    }

    setUser({ ...newUser, ...(userId && { id: userId }) });
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const checkIfUserExists = async (email: string, provider?: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("provider", provider)
      .limit(1);

    if (error) {
      console.error("Error checking user existence:", error.message);
      return false;
    }
    return data && data.length > 0;
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        handleAuthChange(session?.user ?? null);
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
