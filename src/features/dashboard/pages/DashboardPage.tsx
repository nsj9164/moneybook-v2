import { useFetchDashboardSummary } from "../hooks/useFetchDashboardSummary";
import { useAuth } from "@/contexts/AuthContext";
import { useDateFilter } from "@/hooks/useDateFilter";
import { DashboardMain } from "../components/DashboardMain";
import { DashboardOnboarding } from "../components/DashboardOnboarding";
import { useFetchRecentExpenses } from "../hooks/useFetchRecentExpenses";

const Dashboard = () => {
  const { firstExpenseYear, ...dateFilter } = useDateFilter();
  const { year, month } = dateFilter.selectedDate;
  const targetDate = new Date(year, month - 1, 1);

  const { userId } = useAuth();
  const summaryData = useFetchDashboardSummary({
    targetDate: targetDate,
    userId: userId!,
  });
  const recentExpenses = useFetchRecentExpenses(targetDate, userId!);
  console.log("#############", summaryData);

  return firstExpenseYear ? (
    <DashboardMain
      summaryData={summaryData}
      recentExpenses={recentExpenses}
      dateFilter={dateFilter}
    />
  ) : (
    <DashboardOnboarding />
  );
};

export default Dashboard;
