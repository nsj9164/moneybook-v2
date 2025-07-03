import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";

export const SixMonthAnalysisItem = () => {
  const heightPercentage = (month.expense / maxMonthlyExpense) * 100;
  const isCurrentMonth = month.month === `${selectedMonth}월`;
  return (
    <div key={month.month} className="flex items-center">
      <div className="w-8 text-sm font-medium text-gray-500 mr-4">
        {month.month}
      </div>
      <div className="flex-1 flex items-center">
        <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${heightPercentage}%` }}
            transition={{ duration: 0.8, delay: 0.1 * index }}
            className={`h-3 rounded-full ${
              isCurrentMonth ? "bg-emerald-500" : "bg-blue-400"
            }`}
          />
        </div>
        <span className="text-sm font-medium text-gray-900 w-20 text-right">
          {formatCurrency(month.expense)}
        </span>
      </div>
    </div>
  );
};
