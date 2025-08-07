import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Loading } from "@/components/common/loading/Loading";

interface RequireAuthProps {
  children: ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  const { user, isLoading } = useAuth();
  console.log("@@@@@@", user, isLoading);
  if (isLoading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export default RequireAuth;
