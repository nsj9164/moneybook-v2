import { formatCurrency } from "@/utils/format";

interface ExpenseSummaryProps {
  expense: number;
  goal: number;
}

const ExpenseSummary = ({ expense, goal }: ExpenseSummaryProps) => {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-4">
        <h2 className="text-base font-semibold">이번 달 총 지출</h2>
        <p className="text-sm text-gray-500">2023년 6월</p>
        <div className="mt-2 text-3xl font-bold text-emerald-600">
          {formatCurrency(expense)}
        </div>
        <p className="text-sm text-gray-500">
          목표 지출액: {formatCurrency(goal)}
        </p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
