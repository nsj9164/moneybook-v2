import { useAuth } from "@/contexts/AuthContext";
import { useDateFilter } from "@/hooks/useDateFilter";
import { DashboardMain } from "../components/DashboardMain";
import { DashboardOnboarding } from "../components/DashboardOnboarding";
import { useFetchRecentExpenses } from "../hooks/useFetchRecentExpenses";
import { DashboardNoData } from "../components/DashboardNoData";
import { PageHeader } from "@/components/common/layout/PageHeader";
import { DateFilterControl } from "@/components/monthSelector/DateFilterControl";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFetchRpcQuery } from "@/hooks/fetchData/useFetchRpcQuery";
import { ChartSummary } from "../types/DashboardSummary";
import { OverviewSummary } from "@/types/OverviewSummary";
import { Loading } from "@/components/common/loading/Loading";

const Dashboard = () => {
  const navigate = useNavigate();
  const dateFilter = useDateFilter();
  const {
    firstExpenseYear,
    selectedDate,
    showDateSelector,
    years,
    targetDate,
    toggleDateSelector,
    handleChangeMonth,
    handleChangeYear,
    goBackOneMonth,
  } = dateFilter;

  const { userId } = useAuth();
  const {
    data: chartData,
    loading: chartLoading,
    error: chartError,
  } = useFetchRpcQuery<ChartSummary>(
    "get_dashboard_chart_data",
    targetDate,
    userId!
  );
  const {
    data: summaryData,
    loading: summaryLoading,
    error: summaryError,
  } = useFetchRpcQuery<OverviewSummary>(
    "get_overview_summary",
    targetDate,
    userId!
  );

  const recentExpenses = useFetchRecentExpenses(targetDate, userId!);

  const hasDataThisMonth = summaryData && summaryData.expenseData.expense > 0;

  if (chartLoading || summaryLoading) return <Loading />;

  if (!firstExpenseYear) {
    return <DashboardOnboarding />;
  }

  return (
    <div className="h-full">
      <PageHeader title="대시보드" description="한눈에 보는 나의 재정 현황">
        <div className="flex items-center space-x-3">
          <DateFilterControl
            selectedDate={selectedDate}
            showDateSelector={showDateSelector}
            years={years}
            toggleDateSelector={toggleDateSelector}
            handleChangeYear={handleChangeYear}
            handleChangeMonth={handleChangeMonth}
          />

          <Button variant="saveBtn" onClick={() => navigate("/expense/add")}>
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            지출 추가
          </Button>
        </div>
      </PageHeader>

      {!hasDataThisMonth ? (
        <DashboardNoData
          selectedDate={selectedDate}
          goBackOneMonth={goBackOneMonth}
        />
      ) : (
        <DashboardMain
          summaryData={summaryData}
          chartData={chartData}
          recentExpenses={recentExpenses}
          selectedMonth={selectedDate.month}
        />
      )}
    </div>
  );
};

export default Dashboard;
