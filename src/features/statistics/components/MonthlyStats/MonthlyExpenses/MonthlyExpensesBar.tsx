import { CategorySummary } from "@/features/statistics/types/MonthlyStatistics";
import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";

export const MonthlyExpensesBar = ({
  expenses,
}: {
  expenses: CategorySummary;
}) => {
  return (
    <div key={category.name} className="flex-1 flex flex-col items-center">
      <div className="w-full flex justify-center space-x-2 mb-2">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${lastHeight * 0.8}%` }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`w-6 rounded-t-sm ${category.color
            .replace("bg-", "bg-")
            .replace("-500", "-300")}`}
          title={`지난달: ${formatCurrency(category.lastMonth)}`}
        />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${currentHeight * 0.8}%` }}
          transition={{
            duration: 0.5,
            delay: index * 0.1 + 0.1,
          }}
          className={`w-6 rounded-t-sm ${category.color}`}
          title={`이번달: ${formatCurrency(category.currentMonth)}`}
        />
      </div>
      <div className="text-xs font-medium text-gray-600 mt-2">
        {category.name}
      </div>
      <div className="text-xs text-gray-500">
        {formatCurrency(category.currentMonth)}
      </div>
    </div>
  );
};
