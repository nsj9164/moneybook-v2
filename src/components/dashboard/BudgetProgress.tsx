import { formatCurrency } from "@/utils/format";

interface BudgetProgressProps {
  expense: number;
  goal: number;
}

const BudgetProgress = ({ expense, goal }: BudgetProgressProps) => {
  const goalPercentage = Math.round((expense / goal) * 100);

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-4">
        <h2 className="text-base font-semibold">목표 대비 지출</h2>
        <p className="text-sm text-gray-500">목표: {formatCurrency(goal)}</p>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{goalPercentage}%</span>
            <span className="text-sm text-gray-500">100%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-emerald-600"
              style={{ width: `${Math.min(goalPercentage, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            {goalPercentage < 100
              ? `목표까지 ${formatCurrency(goal - expense)} 남았습니다.`
              : "목표를 초과했습니다."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;
