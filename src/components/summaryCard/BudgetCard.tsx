import { formatCurrency } from "@/utils/format";
import { BudgetSummary } from "@/types/OverviewSummary";

export const BudgetCard = ({ budgetData }: { budgetData: BudgetSummary }) => {
  const { budget, budgetRate } = budgetData;

  return (
    <div>
      <span className="text-sm text-gray-500">
        목표: ₩{formatCurrency(budget)}
      </span>

      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
        <div
          className={`h-2 rounded-full ${
            budgetRate > 100 ? "bg-red-500" : "bg-emerald-500"
          }`}
          style={{
            width: `${Math.min(budgetRate, 100)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
