import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Loading } from "@/components/common/loading/Loading";

interface RequireAuthProps {
  children: ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  const { userId, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!userId) return <Navigate to="/login" replace />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default RequireAuth;
