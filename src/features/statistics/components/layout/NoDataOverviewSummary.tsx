import { BudgetCard } from "@/components/summaryCard/BudgetCard";
import OverviewCard from "@/components/summaryCard/OverviewCard";
import { OverviewSummary } from "@/types/OverviewSummary";
import { formatCurrency } from "@/utils/format";
import { BarChart3, PieChart, Target, TrendingUp } from "lucide-react";

export const NoDataOverviewSummary = ({
  summaryData,
}: {
  summaryData: OverviewSummary;
}) => {
  const { expenseData, incomeData, savingData, budgetData } = summaryData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* 예상 월 수입 */}
      <OverviewCard
        icon={<TrendingUp className="h-8 w-8 text-gray-400" />}
        label="예상 월 수입"
        value={formatCurrency(incomeData.income)}
        valueColor="text-gray-400"
        ratio={incomeData.incomeRate}
        isIncrease={incomeData.isIncrease}
        hasData={incomeData.income !== 0}
      >
        <div className="mt-1 text-xs text-gray-400">지난 달 기준</div>
      </OverviewCard>

      {/* 현재 지출 */}
      <OverviewCard
        icon={<BarChart3 className="h-8 w-8 text-gray-400" />}
        label="현재 지출"
        value={formatCurrency(expenseData.expense)}
        valueColor="text-gray-900"
        ratio={expenseData.expense}
        isIncrease={expenseData.isIncrease}
        hasData={expenseData.expense !== 0}
      >
        <div className="mt-1 text-xs text-amber-600">데이터 없음</div>
      </OverviewCard>

      {/* 예상 저축 금액 */}
      <OverviewCard
        icon={<PieChart className="h-8 w-8 text-gray-400" />}
        label="예상 저축 금액"
        value={formatCurrency(savingData.saving)}
        valueColor="text-gray-400"
        ratio={savingData.savingRate}
        isIncrease={savingData.isIncrease}
        hasData={savingData.saving !== 0}
      >
        <div className="mt-1 text-xs text-gray-400">지출 기록 후 계산</div>
      </OverviewCard>

      {/* 예상 달성률 */}
      <OverviewCard
        icon={<Target className="h-8 w-8 text-gray-400" />}
        label="예산 달성률"
        value={`${budgetData.budgetRate}%`}
        valueColor="text-gray-400"
        ratio={budgetData.budgetRate}
        isIncrease={budgetData.isIncrease}
        hasData={budgetData.budget !== 0}
      >
        <BudgetCard budgetData={budgetData} />
      </OverviewCard>
    </div>
  );
};
