import { formatCurrency } from "@/utils/format";

interface MonthlyRecurringItemProps {
  expense: {
    id: number;
    name: string;
    category: string;
    amount: number;
  };
}
export const MonthlyRecurringItem = ({
  expense,
}: MonthlyRecurringItemProps) => {
  const { name, category, amount } = expense;
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-xs text-gray-500">{category}</div>
      </div>
      <div className="text-sm font-bold text-gray-700">
        {formatCurrency(amount)}
      </div>
    </div>
  );
};
