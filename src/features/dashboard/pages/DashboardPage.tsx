import { useFetchDashboardSummary } from "../hooks/useFetchDashboardSummary";
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
  const summaryData = useFetchDashboardSummary({
    targetDate: targetDate,
    userId: userId!,
  });
  const recentExpenses = useFetchRecentExpenses(targetDate, userId!);

  const hasDataThisMonth = summaryData.expenseSummary.expense > 0;

  if (!firstExpenseYear) {
    return <DashboardOnboarding />;
  }

  return (
    <div className="h-full">
      <PageHeader
        title="예산 계획"
        description="카테고리별 예산을 설정하고 지출을 체계적으로 관리하세요."
      >
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
          recentExpenses={recentExpenses}
          selectedMonth={selectedDate.month}
        />
      )}
    </div>
  );
};

export default Dashboard;
