import { CardSection } from "@/components/common/layout/CardSection";
import { formatCurrency } from "@/utils/format";
import { RecurringExpensesSummary } from "../../../types/MonthlyStatistics";
import { MonthlyRecurringItem } from "./MonthlyRecurringItem";

export const MonthlyRecurrings = ({
  recurringExpenses,
}: {
  recurringExpenses: RecurringExpensesSummary;
}) => {
  const { totalAmount, expenseRatio } = recurringExpenses;
  return (
    <CardSection title="고정비">
      <div className="grid grid-cols-1 gap-3">
        {recurringExpenses.items.map((expense) => (
          <MonthlyRecurringItem key={expense.id} expense={expense} />
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            월 고정비 총액
          </span>
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(totalAmount)}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          전체 지출의 {expenseRatio}%
        </div>
      </div>
    </CardSection>
  );
};
