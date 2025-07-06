import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { OverviewCard } from "./OverviewCard";
import { ExpenseSummary } from "../../types/DashboardSummaryState";

export const ExpenseCard = ({
  expense,
  monthlyExpenseRate,
  isExpenseIncrease,
}: ExpenseSummary) => {
  return (
    <OverviewCard
      transition={{ duration: 0.5 }}
      title="이번 달 지출"
      amount={expense}
      icon={ArrowUpRight}
      iconBgColor="bg-red-50"
      iconColor="text-red-600"
    >
      {isExpenseIncrease ? (
        <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
      ) : (
        <ArrowDownRight className="h-4 w-4 text-emerald-500 mr-1" />
      )}
      <span
        className={`text-sm font-medium ${
          isExpenseIncrease ? "text-red-600" : "text-emerald-600"
        }`}
      >
        {Math.abs(monthlyExpenseRate)}%
      </span>
      <span className="text-sm text-gray-500 ml-1">전월 대비</span>
    </OverviewCard>
  );
};
