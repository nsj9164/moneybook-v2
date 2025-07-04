import { ArrowUpRight, DollarSign } from "lucide-react";
import { IncomeSummary } from "../../types/DashboardSummary";
import { OverviewCard } from "./OverviewCard";

export const IncomeCard = ({
  income,
  monthlyIncomeRate,
  isIncomeIncrease,
}: IncomeSummary) => {
  return (
    <OverviewCard
      transition={{ duration: 0.5, delay: 0.1 }}
      title="이번 달 수입"
      amount={income}
      icon={DollarSign}
      iconBgColor="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
      <span className="text-sm font-medium text-emerald-600">
        {monthlyIncomeRate}%
      </span>
      <span className="text-sm text-gray-500 ml-1">전월 대비</span>
    </OverviewCard>
  );
};
