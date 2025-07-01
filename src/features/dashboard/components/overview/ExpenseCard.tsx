import { formatCurrency } from "@/utils/format";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export const ExpenseCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">이번 달 지출</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(monthlyExpense)}
          </h3>
          <div className="flex items-center mt-2">
            {isIncrease ? (
              <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-emerald-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                isIncrease ? "text-red-600" : "text-emerald-600"
              }`}
            >
              {Math.abs(monthlyChangeRate).toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">전월 대비</span>
          </div>
        </div>
        <div className="bg-red-50 rounded-full p-3">
          <ArrowUpRight className="h-6 w-6 text-red-600" />
        </div>
      </div>
    </motion.div>
  );
};
