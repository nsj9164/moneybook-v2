import { JSX, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  children: ReactNode;
}

function RequireAuth({
  isAuthenticated,
  isLoading,
  children,
}: RequireAuthProps): JSX.Element | null {
  if (isLoading) return <div>세션 복구 중입니다...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default RequireAuth;
