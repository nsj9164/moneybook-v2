import { WeeklySummary } from "@/features/statistics/types/MonthlyStatisticsType";
import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";

export const WeeklyExpensesByDay = ({
  weekData,
}: {
  weekData: WeeklySummary;
}) => {
  const { weekNumber, expense, expenseRatio, avgDaily } = weekData;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          {weekNumber}주차
        </span>
        <span className="text-sm font-medium text-gray-900">
          {formatCurrency(expense)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${expenseRatio}%` }}
          transition={{ duration: 0.5, delay: weekNumber * 0.1 }}
          className="h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
        />
      </div>
      <div className="text-xs text-gray-500">
        일평균: {formatCurrency(avgDaily)}
      </div>
    </div>
  );
};
