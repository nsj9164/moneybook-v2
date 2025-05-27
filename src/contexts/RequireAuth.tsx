import { JSX, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface RequireAuthProps {
  children: ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  const { userId, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>세션 복구 중입니다...</div>;
  if (!userId) return <Navigate to="/login" replace />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default RequireAuth;
