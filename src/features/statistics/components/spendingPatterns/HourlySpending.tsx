import { StatisticsCard } from "./StatisticsCard";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/format";

export const HourlySpending = () => {
  return (
    <StatisticsCard title="시간대별 지출 패턴">
      <div className="h-48">
        <div className="h-full flex items-end justify-between space-x-4">
          {timeData.map((item, index) => {
            const heightPercentage = (item.expense / maxTimeValue) * 100;

            return (
              <div
                key={item.time}
                className="flex-1 flex flex-col items-center"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercentage * 0.8}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-sm"
                />
                <div className="mt-2 text-sm font-medium text-gray-600">
                  {item.time}
                </div>
                <div className="text-xs text-gray-500">
                  {formatCurrency(item.expense)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">인사이트</h3>
        <p className="text-sm text-gray-600">
          저녁 시간대(18:00-22:00)에 가장 많은 지출이 발생합니다. 주로 식비와
          여가 활동에 집중되어 있습니다.
        </p>
      </div>
    </StatisticsCard>
  );
};
