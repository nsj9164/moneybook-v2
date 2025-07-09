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
  selectedMonth: number;
}

export const DashboardMain = ({
  summaryData,
  recentExpenses,
  selectedMonth,
}: DashboardMainProps) => {
  const { topCategories, lastSixMonths } = summaryData.trendSummary;
  console.log("############", lastSixMonths);
  return (
    <div className="p-6 space-y-6">
      {/* 핵심 지표 카드 */}
      <OverviewSection summaryData={summaryData} />

      {/* 요약 차트 섹션 */}
      <AnalysisSection
        topCategories={topCategories}
        lastSixMonths={lastSixMonths}
        selectedMonth={selectedMonth}
      />

      {/* 하단 섹션: 최근 거래 & 인사이트 */}
      <TransactionSection recentExpenses={recentExpenses} />
    </div>
  );
};
