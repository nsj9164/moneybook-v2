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
import { ErrorBox } from "@/components/common/error/ErrorBox";

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
    isLoading: chartLoading,
    error: chartError,
    refetch: refetchChart,
  } = useFetchRpcQuery<ChartSummary>(
    "get_dashboard_chart_data",
    targetDate,
    userId!
  );
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useFetchRpcQuery<OverviewSummary>(
    "get_overview_summary",
    targetDate,
    userId!
  );

  console.log("#######", chartData, summaryData, targetDate, userId);

  const recentExpenses = useFetchRecentExpenses(targetDate, userId!);
  const hasDataThisMonth = summaryData && summaryData.expenseData.expense > 0;

  const isLoading = chartLoading || summaryLoading;
  const isError = chartError || summaryError;
  const hasData = chartData && summaryData;

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <ErrorBox
        message="대시보드 데이터를 불러오는 데 실패했어요."
        onRetry={() => {
          refetchChart();
          refetchSummary();
        }}
      />
    );
  if (!hasData) return null;
  if (!firstExpenseYear) return <DashboardOnboarding />;

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

      {!summaryLoading && !hasDataThisMonth ? (
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
