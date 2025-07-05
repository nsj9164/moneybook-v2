import { PageHeader } from "@/components/common/layout/PageHeader";
import { DateFilterControl } from "@/components/monthSelector/DateFilterControl";
import { useDateFilter } from "@/hooks/useDateFilter";
import { OverviewSection } from "./overview/OverviewSection";
import { AnalysisSection } from "./analysis/AnalysisSection";
import { TransactionSection } from "./transactions/TransactionSection";
import { IExpense } from "@/types";
import { DateFilterState } from "@/types/useDateFilter";
import { DashboardSummaryState } from "../types/DashboardSummaryState";

interface DashboardMainProps {
  summaryData: DashboardSummaryState;
  recentExpenses: IExpense[];
  dateFilter: DateFilterState;
}

export const DashboardMain = ({
  summaryData,
  recentExpenses,
  dateFilter,
}: DashboardMainProps) => {
  const {
    selectedDate,
    years,
    showDateSelector,
    toggleDateSelector,
    handleChangeYear,
    handleChangeMonth,
  } = useDateFilter();

  const { topCategories, lastSixMonths } = summaryData.trendSummary;

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <PageHeader title="대시보드" description="한눈에 보는 나의 재정 현황">
        <DateFilterControl
          selectedDate={selectedDate}
          showDateSelector={showDateSelector}
          years={years}
          toggleDateSelector={toggleDateSelector}
          handleChangeYear={handleChangeYear}
          handleChangeMonth={handleChangeMonth}
        />
      </PageHeader>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 space-y-6">
        {/* 핵심 지표 카드 */}
        <OverviewSection summaryData={summaryData} />

        {/* 요약 차트 섹션 */}
        <AnalysisSection
          topCategories={topCategories}
          lastSixMonths={lastSixMonths}
          selectedMonth={selectedDate.month}
        />

        {/* 하단 섹션: 최근 거래 & 인사이트 */}
        <TransactionSection recentExpenses={recentExpenses} />
      </div>
    </div>
  );
};
