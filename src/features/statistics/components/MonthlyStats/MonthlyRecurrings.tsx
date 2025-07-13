import { CardSection } from "@/components/common/layout/CardSection";
import { formatCurrency } from "@/utils/format";

export const MonthlyRecurrings = () => {
  return (
    <CardSection title="고정비">
      <div className="grid grid-cols-1 gap-3">
        {fixedExpenses.map((expense, index) => (
          <div
            key={expense.name}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="text-sm font-medium text-gray-900">
                {expense.name}
              </div>
              <div className="text-xs text-gray-500">{expense.category}</div>
            </div>
            <div className="text-sm font-bold text-gray-700">
              {formatCurrency(expense.amount)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            월 고정비 총액
          </span>
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(
              fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0)
            )}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          전체 지출의{" "}
          {(
            (fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0) /
              currentData.totalExpense) *
            100
          ).toFixed(1)}
          %
        </div>
      </div>
    </CardSection>
  );
};
