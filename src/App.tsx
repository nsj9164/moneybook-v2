import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Expenses from "./pages/Expenses";
import Statistics from "./pages/Statistics";
import Budget from "./pages/budget";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";
import RequireAuth from "./contexts/RequireAuth";
import Login from "./pages/Login";
import { AuthCallback } from "./pages/AuthCallback";
import Settings from "./pages/settings";
import ExpenseFormPage from "./components/expenses/edit";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="expenses/edit" element={<ExpenseFormPage />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="budget" element={<Budget />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
