import { PieChart } from "lucide-react";
import { OverviewCard } from "./OverviewCard";
import { SavingSummary } from "../../types/DashboardSummaryState";

export const SavingsCard = ({
  savingSummary,
}: {
  savingSummary: SavingSummary;
}) => {
  const { saving, savingRate } = savingSummary;
  const roundRate = Math.round(savingRate);
  return (
    <OverviewCard
      transition={{ duration: 0.5, delay: 0.2 }}
      title="저축 금액"
      amount={saving}
      icon={PieChart}
      iconBgColor="bg-blue-50"
      iconColor="text-blue-600"
    >
      <span className="text-sm font-medium text-blue-600">{roundRate}%</span>
      <span className="text-sm text-gray-500 ml-1">저축률</span>
    </OverviewCard>
  );
};
