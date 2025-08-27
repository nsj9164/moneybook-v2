import { CardSection } from "@/components/common/layout/CardSection";
import { YearlyFixedExpense } from "../../../types/YearlyStatisticsType";
import { FixedExpenseItem } from "./FixedExpenseItem";
import { formatCurrency } from "@/utils/format";
export const YearlyFixedExpenses = ({
  yearlyFixedExpenses,
}: {
  yearlyFixedExpenses: YearlyFixedExpense;
}) => {
  const { total, details, percentageOfTotalExpense } = yearlyFixedExpenses;
  return (
    <CardSection title="연간 고정비">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-amber-600 mb-2">
          {formatCurrency(total)}
        </div>
        <div className="text-sm text-gray-600">연간 고정비 총액</div>
      </div>

      <div className="space-y-3">
        {details &&
          details.map((expense) => (
            <FixedExpenseItem key={expense.itemName} expense={expense} />
          ))}
      </div>

      <div className="mt-4 p-3 bg-amber-50 rounded-lg">
        <div className="text-sm text-amber-800 text-center">
          💡 고정비는 전체 지출의 {percentageOfTotalExpense}
          %를 차지해요
        </div>
      </div>
    </CardSection>
  );
};
