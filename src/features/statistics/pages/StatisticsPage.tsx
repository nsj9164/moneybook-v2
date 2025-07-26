import { StatisticsOnboarding } from "../components/views/StatisticsOnboarding";
import { MonthlyStatistics } from "../components/views/MonthlyStatistics";
import { useAuth } from "@/contexts/AuthContext";
import { useDateFilter } from "@/hooks/useDateFilter";
import { useState } from "react";
import { DashboardHeader } from "../components/header/DashboardHeader";
import { OverviewSummarySection } from "@/components/summaryCard/OverviewSummarySection";
import { useFetchRpcQuery } from "@/hooks/fetchData/useFetchRpcQuery";
import { MonthlyStatisticsResponse } from "../types/MonthlyStatistics";
import { OverviewSummary } from "@/types/OverviewSummary";
import { Loading } from "@/components/common/loading/Loading";
import { YearlyStatistics } from "../components/views/YearlyStatistics";
import { YearlyStatisticsResponse } from "../types/YearlyStatistics";
import { StatisticsNoData } from "../components/views/StatisticsNoData";

const Statistics = () => {
  const { userId } = useAuth();
  const dateFilter = useDateFilter();
  const { firstExpenseYear, targetDate, selectedDate, goBackOneMonth } =
    dateFilter;

  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "year">(
    "month"
  );

  const togglePeriod = (period: "month" | "year") => {
    setSelectedPeriod(period);
  };

  // 월간 통계 데이터
  const summaryQuery = useFetchRpcQuery<OverviewSummary>(
    "get_overview_summary",
    targetDate,
    userId!
  );

  // 연간 통계 데이터
  const yearlySummaryQuery = useFetchRpcQuery<OverviewSummary>(
    "get_yearly_overview_summary",
    targetDate,
    userId!
  );

  // 월간 데이터
  const monthlyQuery = useFetchRpcQuery<MonthlyStatisticsResponse>(
    "get_monthly_statistics",
    targetDate,
    userId!
  );

  // 연간 데이터
  const yearlyQuery = useFetchRpcQuery<YearlyStatisticsResponse>(
    "get_yearly_statistics",
    targetDate,
    userId!
  );

  const isLoading =
    summaryQuery.isLoading ||
    yearlySummaryQuery.isLoading ||
    monthlyQuery.isLoading ||
    yearlyQuery.isLoading;

  if (isLoading) return <Loading />;

  if (!firstExpenseYear) return <StatisticsOnboarding />;

  const summaryData =
    selectedPeriod === "month" ? summaryQuery.data : yearlySummaryQuery.data;

  const isEmpty = !summaryData || summaryData.expenseData?.expense === 0;
  console.log(
    "isEmpty!!!!",
    selectedPeriod,
    summaryQuery.data,
    yearlySummaryQuery.data
  );

  if (isEmpty) {
    return (
      <div className="p-6 py-8">
        <StatisticsNoData
          selectedDate={selectedDate}
          summaryData={summaryData!}
          goBackOneMonth={goBackOneMonth}
        />
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <DashboardHeader
        selectedPeriod={selectedPeriod}
        dateFilter={dateFilter}
        togglePeriod={togglePeriod}
      />

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 py-8 space-y-6">
        {/* 통계 요약 카드 */}
        <OverviewSummarySection
          selectedPeriod={selectedPeriod}
          summaryData={summaryData}
        />

        {/* 기간별 콘텐츠 */}
        {selectedPeriod === "month" && monthlyQuery.data && (
          <MonthlyStatistics
            monthlyData={monthlyQuery.data}
            targetDate={targetDate}
          />
        )}
        {selectedPeriod === "year" && yearlyQuery.data && (
          <YearlyStatistics yearlyData={yearlyQuery.data} />
        )}
      </div>
    </div>
  );
};

export default Statistics;
