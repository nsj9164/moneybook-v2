import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Expenses from "./pages/Expenses";
import Statistics from "./pages/Statistics";
import Budget from "./pages/Budget";
import { Settings } from "lucide-react";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { AuthCallback } from "./pages/AuthCallback";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth isAuthenticated={isAuthenticated}>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route index element={<Dashboard />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="budget" element={<Budget />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

// 인증 필요한 라우트를 위한 컴포넌트
function RequireAuth({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: JSX.Element;
}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default App;
