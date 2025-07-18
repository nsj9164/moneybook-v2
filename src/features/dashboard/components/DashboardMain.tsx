import { AnalysisSection } from "./analysis/AnalysisSection";
import { TransactionSection } from "./transactions/TransactionSection";
import { IExpense } from "@/types";
import { ChartSummary } from "../types/DashboardSummary";
import { OverviewSummary } from "@/types/OverviewSummary";
import { OverviewSummarySection } from "@/components/summaryCard/OverviewSummarySection";

interface DashboardMainProps {
  summaryData: OverviewSummary;
  chartData: ChartSummary;
  recentExpenses: IExpense[];
  selectedMonth: number;
}

export const DashboardMain = ({
  summaryData,
  chartData,
  recentExpenses,
  selectedMonth,
}: DashboardMainProps) => {
  const { topCategories, lastSixMonths } = chartData;

  return (
    <div className="p-6 space-y-6">
      {/* 핵심 지표 카드 */}
      {/* <OverviewSection
        expenseData={expenseData}
        incomeData={incomeData}
        savingData={savingData}
        budgetData={budgetData}
      /> */}

      <OverviewSummarySection summaryData={summaryData} />

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
