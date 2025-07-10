import { formatCurrency } from "@/utils/format";
import { ArrowUpRight, DollarSign } from "lucide-react";
import { IncomeSummary } from "../../types/DashboardSummaryState";
import { OverviewCard } from "./OverviewCard";

export const IncomeCard = ({
  incomeSummary,
}: {
  incomeSummary: IncomeSummary;
}) => {
  const { income, monthlyIncomeRate, isIncomeIncrease } = incomeSummary;
  const roundedRate = Math.round(monthlyIncomeRate);
  return (
    <OverviewCard
      transition={{ duration: 0.5, delay: 0.1 }}
      title="이번 달 수입"
      amount={formatCurrency(income)}
      icon={DollarSign}
      iconBgColor="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
      <span className="text-sm font-medium text-emerald-600">
        {roundedRate}%
      </span>
      <span className="text-sm text-gray-500 ml-1">전월 대비</span>
    </OverviewCard>
  );
};
