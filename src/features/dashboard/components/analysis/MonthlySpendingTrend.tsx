import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";

export const MonthlySpendingTrend = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
      <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">지출 추이</h3>
        <div className="flex items-center space-x-2">
          <button className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md font-medium">
            월간
          </button>
          <button className="text-xs text-gray-500 px-3 py-1.5 rounded-md hover:bg-gray-50">
            주간
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="h-64">
          {/* 월간 지출 추이 차트 */}
          <div className="h-full flex items-end space-x-2">
            {monthlyTrend.map((item, index) => {
              const heightPercentage = (item.expense / maxMonthlyExpense) * 100;
              const isCurrentMonth = item.month === `${selectedMonth}월`;

              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercentage * 0.8}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`w-full rounded-t-sm ${
                      isCurrentMonth ? "bg-emerald-500" : "bg-emerald-200"
                    }`}
                  />
                  <div className="mt-2 text-xs font-medium text-gray-600">
                    {item.month}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(item.expense).replace("₩", "")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">평균 월 지출</p>
              <p className="text-xs text-gray-500">최근 6개월</p>
            </div>
            <div className="text-lg font-bold text-emerald-600">
              {formatCurrency(
                monthlyTrend.reduce((sum, month) => sum + month.expense, 0) /
                  monthlyTrend.length
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
