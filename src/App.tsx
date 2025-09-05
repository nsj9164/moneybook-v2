import { Routes, Route } from "react-router-dom";
import Dashboard from "@/features/dashboard/pages/DashboardPage";
import MainLayout from "./layouts/MainLayout";
import RequireAuth from "./contexts/RequireAuth";
import Expenses from "./features/transactions/pages/TransactionsPage";
import ExpenseFormPage from "./features/transactions/components/edit";
import Budget from "./features/budget/pages/BudgetPage";
import Settings from "./features/settings/pages/SettingsPage";
import Login from "./features/auth/pages/LoginPage";
import { AuthCallback } from "./features/auth/pages/AuthCallback";
import Statistics from "./features/statistics/pages/StatisticsPage";
import Profile from "./features/profile/pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import Transations from "./features/transactions/pages/TransactionsPage";

function App() {
  return (
    <>
      <Toaster position="top-right" />
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
          <Route path="transactions" element={<Transations />} />
          <Route path="transactions/edit" element={<ExpenseFormPage />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="budget" element={<Budget />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
