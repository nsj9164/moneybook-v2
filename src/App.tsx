import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthCallback } from "@/pages/AuthCallback";
import Login from "@/pages/Login"; // 너의 로그인 페이지
import Dashboard from "@/pages/Dashboard"; // 메인 페이지 예시
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/Expenses/add";
import Statistics from "./pages/Statistics";
import Budget from "./pages/Budget";
import { Settings } from "lucide-react";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth isAuthenticated={isAuthenticated} isLoading={isLoading}>
            <MainLayout /> {/* ✅ MainLayout이 여기서! */}
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} /> {/* ✅ '/'는 Dashboard */}
        <Route path="expenses" element={<Expenses />} />
        <Route path="expenses/add" element={<AddExpense />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="budget" element={<Budget />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

function RequireAuth({
  isAuthenticated,
  isLoading,
  children,
}: {
  isAuthenticated: boolean;
  isLoading: boolean;
  children: JSX.Element;
}) {
  if (isLoading) return <div>세션 복구 중입니다...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default App;
