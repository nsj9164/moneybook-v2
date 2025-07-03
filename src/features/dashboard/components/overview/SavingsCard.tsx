import { PieChart } from "lucide-react";
import { SavingSummary } from "../../types/DashboardSummary";
import { OverviewCard } from "./OverviewCard";

export const SavingsCard = ({ saving, savingRate }: SavingSummary) => {
  return (
    <OverviewCard
      transition={{ duration: 0.5, delay: 0.2 }}
      title="저축 금액"
      amount={saving}
      icon={PieChart}
      iconBgColor="bg-blue-50"
      iconColor="text-blue-600"
    >
      <span className="text-sm font-medium text-blue-600">
        {savingRate.toFixed(1)}%
      </span>
      <span className="text-sm text-gray-500 ml-1">저축률</span>
    </OverviewCard>
  );
};
