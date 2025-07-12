import { CategorySummary } from "@/features/statistics/types/MonthlyStatistics";
import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";

export const MonthlyIncomeBar = ({ income }: { income: CategorySummary }) => {
  return (
    <div className="flex-1 flex flex-col items-center">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: `${height * 0.8}%` }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`w-full rounded-t-lg ${
          isCurrentMonth ? "bg-emerald-500" : "bg-emerald-300"
        }`}
        title={`수입: ${formatCurrency(item.income)}`}
      />
      <div className="text-xs font-medium text-gray-600 mt-2">{item.month}</div>
      <div className="text-xs text-gray-500">{formatCurrency(item.income)}</div>
    </div>
  );
};
