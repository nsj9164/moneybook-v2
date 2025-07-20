import { StatisticsOnboarding } from "../components/views/StatisticsOnboarding";
import { MonthlyStatistics } from "../components/views/MonthlyStatistics";
import { useAuth } from "@/contexts/AuthContext";
import { useDateFilter } from "@/hooks/useDateFilter";
import { useState } from "react";
import { DashboardHeader } from "../components/header/DashboardHeader";
import { OverviewSummarySection } from "@/components/summaryCard/OverviewSummarySection";
import { useFetchRpc } from "@/hooks/fetchData/useFetchRpc";
import { MonthlyStatisticsResponse } from "../types/MonthlyStatistics";
import { OverviewSummary } from "@/types/OverviewSummary";
import { Loading } from "@/components/common/loading/Loading";
import { YearlyStatistics } from "../components/views/YearlyStatistics";
import { YearlyStatisticsResponse } from "../types/YearlyStatistics";

const Statistics = () => {
  const { userId } = useAuth();
  const dateFilter = useDateFilter();
  const { targetDate } = dateFilter;

  const {
    data: summaryData,
    loading: summaryLoading,
    error: summaryError,
  } = useFetchRpc<OverviewSummary>("get_overview_summary", targetDate, userId!);

  const {
    data: monthlyData,
    loading: monthlyLoading,
    error: monthlyError,
  } = useFetchRpc<MonthlyStatisticsResponse>(
    "get_monthly_statistics",
    targetDate,
    userId!
  );

  const {
    data: yearlyData,
    loading: yearlyLoading,
    error: yearlyError,
  } = useFetchRpc<YearlyStatisticsResponse>(
    "get_yearly_statistics",
    targetDate,
    userId!
  );

  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "year">(
    "month"
  );

  const togglePeriod = (period: "month" | "year") => {
    setSelectedPeriod(period);
  };

  if ((summaryLoading, monthlyLoading)) return <Loading />;

  // 빈 상태 화면
  const renderEmptyState = () => <StatisticsOnboarding />;

  // 현재 달 데이터가 없는 경우의 화면
  // const renderNoCurrentMonthDataState = () => <StatisticsNoData />;

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
        {/* 통계 요약 카드 - 전월/전년 대비 추가 */}
        <OverviewSummarySection
          selectedPeriod={selectedPeriod}
          summaryData={summaryData}
        />

        {/* 기간별 콘텐츠 */}
        {selectedPeriod === "month" && (
          <MonthlyStatistics monthlyData={monthlyData} />
        )}
        {selectedPeriod === "year" && (
          <YearlyStatistics yearlyData={yearlyData} />
        )}
      </div>
    </div>
  );
};

export default Statistics;
