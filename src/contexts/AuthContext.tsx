import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/utils/supabase";
import { useAuthListener } from "@/features/auth/hooks/useAuthListener";
import {
  AuthContextType,
  ProviderType,
  User,
} from "@/features/auth/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useAuthListener(user, setUser, setIsLoading);

  const userId = user?.id ?? null;
  const isAuthenticated = !!user;

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({
      user,
      userId,
      isAuthenticated,
      isLoading,
      logout,
    }),
    [user, isLoading]
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
