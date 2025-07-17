import { useAuth } from "@/contexts/AuthContext";
import { useDateFilter } from "@/hooks/useDateFilter";
import { DashboardMain } from "../components/DashboardMain";
import { DashboardOnboarding } from "../components/DashboardOnboarding";
import { useFetchRecentExpenses } from "../hooks/useFetchRecentExpenses";
import { DashboardNoData } from "../components/DashboardNoData";
import { useMemo } from "react";
import { format } from "date-fns";
import { PageHeader } from "@/components/common/layout/PageHeader";
import { DateFilterControl } from "@/components/monthSelector/DateFilterControl";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFetchRpc } from "@/hooks/fetchData/useFetchRpc";
import { ChartSummary } from "../types/DashboardSummary";
import { OverviewSummary } from "@/types/overviewSummary";

const Dashboard = () => {
  const navigate = useNavigate();
  const dateFilter = useDateFilter();
  const {
    firstExpenseYear,
    selectedDate,
    showDateSelector,
    years,
    toggleDateSelector,
    handleChangeMonth,
    handleChangeYear,
  } = dateFilter;
  const { year, month } = selectedDate;
  const targetDate = useMemo(
    () => format(new Date(year, month - 1, 1), "yyyy-MM-dd"),
    [year, month]
  );

  const { userId } = useAuth();
  const chartData = useFetchRpc<ChartSummary>(
    "get_dashboard_chart_data",
    targetDate,
    userId!
  );
  const summaryData = useFetchRpc<OverviewSummary>(
    "get_overview_summary",
    targetDate,
    userId!
  );
  console.log("@@@@@@@@@@@@@@", chartData);
  console.log("@@@@@@@@@@@@@@", summaryData);

  const recentExpenses = useFetchRecentExpenses(targetDate, userId!);

  const hasDataThisMonth = summaryData && summaryData.expenseData.expense > 0;

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
          handleChangeYear={handleChangeYear}
          handleChangeMonth={handleChangeMonth}
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
