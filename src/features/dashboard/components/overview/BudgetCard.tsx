import { formatCurrency } from "@/utils/format";
import { OverviewCard } from "./OverviewCard";
import { BudgetSummary } from "../../types/DashboardSummary";
import { Target } from "lucide-react";

export const BudgetCard = ({ budget, budgetRate }: BudgetSummary) => {
  return (
    <OverviewCard
      transition={{ duration: 0.5, delay: 0.3 }}
      title="예산 달성률"
      amount={`${budgetRate.toFixed(1)}%`}
      icon={Target}
      iconBgColor="bg-purple-50"
      iconColor="text-purple-600"
    >
      <span className="text-sm text-gray-500">
        목표: {formatCurrency(budget)}
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
    </OverviewCard>
  );
};
