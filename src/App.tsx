import { Routes, Route } from "react-router-dom";
import Dashboard from "@/features/dashboard/pages/DashboardPage";
import MainLayout from "./layouts/MainLayout";
import RequireAuth from "./contexts/RequireAuth";
import Expenses from "./features/expenses/pages/ExpensesPage";
import ExpenseFormPage from "./features/expenses/components/edit";
import Budget from "./features/budget/pages/BudgetPage";
import Settings from "./features/settings/pages/SettingsPage";
import Login from "./features/auth/pages/LoginPage";
import { AuthCallback } from "./features/auth/pages/AuthCallback";
import Statistics from "./features/statistics/pages/StatisticsPage";
import Profile from "./features/profile/pages/ProfilePage";

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
