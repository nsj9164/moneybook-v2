import { OverviewSection } from "./overview/OverviewSection";
import { AnalysisSection } from "./analysis/AnalysisSection";
import { TransactionSection } from "./transactions/TransactionSection";
import { IExpense } from "@/types";
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
  const {
    expenseSummary,
    incomeSummary,
    savingSummary,
    budgetSummary,
    trendSummary,
  } = summaryData;
  const { topCategories, lastSixMonths } = trendSummary;

  return (
    <div className="p-6 space-y-6">
      {/* 핵심 지표 카드 */}
      <OverviewSection
        expenseSummary={expenseSummary}
        incomeSummary={incomeSummary}
        savingSummary={savingSummary}
        budgetSummary={budgetSummary}
      />

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
