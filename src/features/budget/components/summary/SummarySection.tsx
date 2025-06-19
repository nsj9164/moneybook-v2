import { formatCurrency } from "@/utils/format";
import { SummaryCard } from "./SummaryCard";
import { BudgetSummary } from "../../types/budget";

interface SummarySectionProps {
  summary: BudgetSummary;
  budgetsLen: number;
}

export const SummarySection = ({
  summary,
  budgetsLen,
}: SummarySectionProps) => {
  const {
    totalBudget,
    totalSpent,
    remainingBudget,
    budgetProgress,
    remainingDay,
    remainingPercent,
    averagePerDay,
    isCurrentMonth,
    isPastMonth,
  } = summary;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title={"총 예산"}
        value={formatCurrency(totalBudget) ?? 0}
        colorClass={"text-gray-900"}
        footerLabel={"카테고리"}
        footerValue={`${budgetsLen}개`}
      />

      <SummaryCard
        title={"사용 금액"}
        value={formatCurrency(totalSpent) ?? 0}
        colorClass={"text-red-600"}
        footerLabel={"예산 대비"}
        footerValue={`${budgetProgress}%`}
        progressClass={`${
          budgetProgress > 80 ? "bg-red-500" : "bg-emerald-500"
        }`}
        progress={Math.min(budgetProgress, 100)}
      />

      <SummaryCard
        title={"남은 예산"}
        value={formatCurrency(remainingBudget)}
        colorClass={"text-emerald-600"}
        footerLabel={"남은 일수"}
        footerValue={`${remainingDay}일`}
        progressClass={`${
          remainingPercent > 80 ? "bg-red-500" : "bg-emerald-500"
        }`}
        progress={Math.min(remainingPercent, 100)}
      >
        <p className="text-xs text-gray-500 mt-2">
          하루 평균 {formatCurrency(averagePerDay)} 사용 가능
        </p>
      </SummaryCard>
    </div>
  );
};
