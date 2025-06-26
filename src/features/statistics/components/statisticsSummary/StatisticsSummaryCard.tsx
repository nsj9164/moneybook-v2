import { LucideIcon } from "lucide-react";
import { SummaryColor } from "../constants/SummaryColor";

interface SummaryCardProps {
  icon: LucideIcon;
  title: string;
  amount: number;
  color: SummaryColor;
}

export const StatisticsSummaryCard = ({
  icon: Icon,
  title,
  amount,
  color,
}: SummaryCardProps) => {
  const styles = SummaryColor[color];
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {/* <TrendingUp className="h-8 w-8 text-emerald-600" /> */}
          <Icon className={`h-8 w-8 ${styles}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className={`text-2xl font-bold ${styles}`}>{amount}</h3>
        </div>
      </div>
    </div>
  );
};
