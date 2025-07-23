import { formatCurrency } from "@/utils/format";
import { BarChart3, PieChart, Target, TrendingUp } from "lucide-react";
import OverviewCard from "./OverviewCard";
import { BudgetCard } from "./BudgetCard";
import { OverviewSummary } from "@/types/OverviewSummary";

interface OverviewSummaryProps {
  selectedPeriod?: "month" | "year";
  summaryData: OverviewSummary;
}

export const OverviewSummarySection = ({
  selectedPeriod = "month",
  summaryData,
}: OverviewSummaryProps) => {
  const { expenseData, incomeData, savingData, budgetData } = summaryData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <OverviewCard
        icon={<TrendingUp className="h-8 w-8 text-emerald-600" />}
        label={selectedPeriod === "month" ? "월 수입" : "연 수입"}
        value={formatCurrency(incomeData.income)}
        valueColor="text-emerald-600"
        ratio={incomeData.monthlyIncomeRate}
        isIncrease={incomeData.isIncrease}
      />
      <OverviewCard
        icon={<BarChart3 className="h-8 w-8 text-red-600" />}
        label={selectedPeriod === "month" ? "월 지출" : "연 지출"}
        value={formatCurrency(expenseData.expense)}
        valueColor="text-red-600"
        ratio={incomeData.monthlyIncomeRate}
        isIncrease={expenseData.isIncrease}
      />
      <OverviewCard
        icon={<PieChart className="h-8 w-8 text-blue-600" />}
        label="저축 금액"
        value={formatCurrency(savingData.saving)}
        valueColor="text-blue-600"
        ratio={savingData.savingRate}
        isIncrease={savingData.isIncrease}
      />
      <OverviewCard
        icon={<Target className="h-8 w-8 text-purple-600" />}
        label="예산 달성률"
        value={`${budgetData.budgetRate}%`}
        valueColor="text-purple-600"
        ratio={budgetData.budgetRate}
        isIncrease={budgetData.isIncrease}
      >
        <BudgetCard budgetData={budgetData} />
      </OverviewCard>
    </div>
  );
};
