import { formatCurrency } from "@/utils/format";
import { BarChart3, PieChart, TrendingUp, TrendingUpDown } from "lucide-react";
import { StatisticsSummaryCard } from "./StatisticsSummaryCard";

export const StatisticsSummarySection = () => {
  const summary = [
    {
      icon: TrendingUp,
      title: "총 수입",
      amount: formatCurrency(totalIncome),
      color: "emerald",
    },
    {
      icon: BarChart3,
      title: "총 지출",
      amount: formatCurrency(totalExpense),
      color: "red",
    },
    {
      icon: PieChart,
      title: "순 저축",
      amount: formatCurrency(totalSavings),
      color: "blue",
    },
    {
      icon: TrendingUpDown,
      title: "저축률",
      amount: ((totalSavings / totalIncome) * 100).toFixed(1),
      color: "purple",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatisticsSummaryCard
        icon={icon}
        title={title}
        amount={amount}
        color={color}
      />
    </div>
  );
};
