import { formatCurrency } from "@/utils/format";
import { SummaryCard } from "../SummaryCard";

export const SummaryInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title={"총 예산"}
        value={formatCurrency(totalBudget)}
        colorClass={"text-gray-900"}
        footerLabel={"카테고리"}
        footerValue={`${budgetCategories.length}개`}
      />

      <SummaryCard
        title={"사용 금액"}
        value={formatCurrency(totalSpent)}
        colorClass={"text-red-600"}
        footerLabel={"예산 대비"}
        footerValue={`${budgetProgress}%`}
        progressClass={`${
          budgetProgress > 100 ? "bg-red-500" : "bg-emerald-500"
        }`}
        progress={`${Math.min(budgetProgress, 100)}%`}
      />

      <SummaryCard
        title={"남은 예산"}
        value={formatCurrency(remainingBudget)}
        colorClass={"text-emerald-600"}
        footerLabel={"남은 일수"}
        footerValue={"15일"}
        progressClass={`${
          budgetProgress > 100 ? "bg-red-500" : "bg-emerald-500"
        }`}
        progress={"50%"}
      >
        <p className="text-xs text-gray-500 mt-2">
          하루 평균 {formatCurrency(remainingBudget / 15)} 사용 가능
        </p>
      </SummaryCard>
    </div>
  );
};
