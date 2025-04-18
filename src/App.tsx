import { SplitLayout } from "./components/layouts/SplitLayout";
import { HeroSection } from "./components/sections/HeroSection";
import { AuthSection } from "./components/sections/AuthSection";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Expenses from "./pages/Expenses";
import Statistics from "./pages/Statistics";
import Budget from "./pages/Budget";
import { Settings } from "lucide-react";
import Profile from "./pages/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  return (
    <AuthProvider>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="budget" element={<Budget />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
  // return <SplitLayout left={<HeroSection />} right={<AuthSection />} />;
  /* return (
    <div className="text-3xl text-green-500 font-bold p-10">
      ✅ Tailwind 적용됨!
    </div>
  ); */
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
