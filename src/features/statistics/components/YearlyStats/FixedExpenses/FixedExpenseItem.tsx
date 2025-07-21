import { FixedExpenseDetail } from "@/features/statistics/types/YearlyStatistics";
import { formatCurrency } from "@/utils/format";

export const FixedExpenseItem = ({
  expense,
}: {
  expense: FixedExpenseDetail;
}) => {
  const { itemName, amount } = expense;
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-sm text-gray-700">{itemName}</span>
      <span className="text-sm font-medium text-gray-900">
        {formatCurrency(amount)}
      </span>
    </div>
  );
};
