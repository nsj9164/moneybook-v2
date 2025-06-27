import { ArrowRight } from "lucide-react";
import { StatisticsCard } from "./StatisticsCard";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/format";

export const IncomeExpenseByMonth = () => {
  return (
    <StatisticsCard
      title={"월별 수입/지출 추이"}
      action={
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
          <span>상세 보기</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      }
    >
      <div className="h-80">
        <div className="h-full flex items-end justify-between space-x-4">
          {monthlyData.map((item, index) => {
            const incomeHeight = (item.income / maxBarValue) * 100;
            const expenseHeight = (item.expense / maxBarValue) * 100;
            const isCurrentMonth = item.month === `${selectedMonth}월`;

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center"
              >
                <div className="w-full flex justify-center space-x-1 mb-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${incomeHeight * 0.7}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`w-4 rounded-t-sm ${
                      isCurrentMonth ? "bg-emerald-500" : "bg-emerald-300"
                    }`}
                    title={`수입: ${formatCurrency(item.income)}`}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${expenseHeight * 0.7}%` }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.1,
                    }}
                    className={`w-4 rounded-t-sm ${
                      isCurrentMonth ? "bg-red-500" : "bg-red-300"
                    }`}
                    title={`지출: ${formatCurrency(item.expense)}`}
                  />
                </div>
                <div className="text-xs font-medium text-gray-600 mt-2">
                  {item.month}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-emerald-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">수입</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">지출</span>
        </div>
      </div>
    </StatisticsCard>
  );
};
