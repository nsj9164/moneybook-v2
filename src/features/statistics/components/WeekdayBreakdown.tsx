import { StatisticsCard } from "./StatisticsCard";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/format";

export const WeekdayBreakdown = () => {
  return (
    <StatisticsCard title="요일별 지출 패턴">
      <div className="h-64">
        <div className="h-full flex items-end justify-between space-x-2">
          {weekdayData.map((item, index) => {
            const heightPercentage = (item.expense / maxWeekdayValue) * 100;
            const isWeekend = item.day === "토" || item.day === "일";

            return (
              <div key={item.day} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercentage * 0.8}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`w-full rounded-t-sm ${
                    isWeekend ? "bg-purple-500" : "bg-blue-500"
                  }`}
                />
                <div className="mt-2 text-xs font-medium text-gray-600">
                  {item.day}
                </div>
                <div className="text-xs text-gray-500">
                  {formatCurrency(item.expense).replace("₩", "")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
          <span className="text-xs text-gray-600">평일</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
          <span className="text-xs text-gray-600">주말</span>
        </div>
      </div>
    </StatisticsCard>
  );
};
