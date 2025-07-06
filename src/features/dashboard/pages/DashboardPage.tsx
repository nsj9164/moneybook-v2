import { useFetchDashboardSummary } from "../hooks/useFetchDashboardSummary";
import { useAuth } from "@/contexts/AuthContext";
import { useDateFilter } from "@/hooks/useDateFilter";
import { DashboardMain } from "../components/DashboardMain";
import { DashboardOnboarding } from "../components/DashboardOnboarding";
import { useFetchRecentExpenses } from "../hooks/useFetchRecentExpenses";
import { DashboardNoData } from "../components/DashboardNoData";

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

  const hasDataThisMonth = summaryData.expenseSummary.expense > 0;
  console.log(
    "#############",
    firstExpenseYear,
    !firstExpenseYear,
    summaryData.expenseSummary.expense,
    hasDataThisMonth
  );

  if (!firstExpenseYear) {
    return <DashboardOnboarding />;
  }

  if (!hasDataThisMonth) {
    const noDataProps = {
      selectedMonth: dateFilter.selectedDate.month,
      showDateSelector: dateFilter.showDateSelector,
      toggleDateSelector: dateFilter.toggleDateSelector,
      handleChangeMonth: dateFilter.handleChangeMonth,
    };

    return <DashboardNoData {...noDataProps} />;
  }

  return (
    <DashboardMain
      summaryData={summaryData}
      recentExpenses={recentExpenses}
      dateFilter={dateFilter}
    />
  );
};

export default Dashboard;
