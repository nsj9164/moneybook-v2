import { CardSection } from "@/components/common/layout/CardSection";
import { formatCurrency } from "@/utils/format";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const MonthlyExpensesByDay = () => {
  return (
    <CardSection
      title="요일별 평균 지출"
      action={
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
          <span>상세 보기</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      }
    >
      <div className="h-80">
        <div className="h-full flex items-end justify-between space-x-4">
          {weekdayData.map((day, index) => {
            const maxValue = Math.max(...weekdayData.map((d) => d.avgExpense));
            const height = (day.avgExpense / maxValue) * 100;
            const isWeekend = day.day === "토" || day.day === "일";

            return (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height * 0.8}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`w-full rounded-t-lg ${day.color} ${
                    isWeekend ? "opacity-90" : ""
                  }`}
                  title={`${day.dayName}: ${formatCurrency(day.avgExpense)}`}
                />
                <div className="text-sm font-medium text-gray-600 mt-2">
                  {day.day}
                </div>
                <div className="text-xs text-gray-500">
                  {formatCurrency(day.avgExpense)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-2">
        <div className="col-span-5 text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-700">평일 평균</div>
          <div className="text-lg font-bold text-blue-600">
            {formatCurrency(
              weekdayData
                .filter((day) =>
                  ["월", "화", "수", "목", "금"].includes(day.day)
                )
                .reduce((sum, day) => sum + day.avgExpense, 0) / 5
            )}
          </div>
        </div>
        <div className="col-span-2 text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-sm font-medium text-orange-700">주말 평균</div>
          <div className="text-lg font-bold text-orange-600">
            {formatCurrency(
              weekdayData
                .filter((day) => ["토", "일"].includes(day.day))
                .reduce((sum, day) => sum + day.avgExpense, 0) / 2
            )}
          </div>
        </div>
      </div>
    </CardSection>
  );
};
