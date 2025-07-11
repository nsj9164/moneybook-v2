import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const MonthlyStatistics = () => {
  return (
    <div className="space-y-6">
      {/* 월별 수입/지출 추이 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              월별 수입/지출 추이
            </h2>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
              <span>상세 보기</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="h-80">
            <div className="h-full flex items-end justify-between space-x-4">
              {monthlyData.map((item, index) => {
                const maxValue = Math.max(
                  ...monthlyData.map((d) => Math.max(d.income, d.expense))
                );
                const incomeHeight = (item.income / maxValue) * 100;
                const expenseHeight = (item.expense / maxValue) * 100;
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
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
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
        </div>
      </div>

      {/* 카테고리별 지출 분석 (모든 기간 공통) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            카테고리별 지출 분석
            {selectedPeriod === "month" && ` (${selectedMonth}월)`}
            {selectedPeriod === "quarter" &&
              ` (${Math.ceil(Number.parseInt(selectedMonth) / 3)}분기)`}
            {selectedPeriod === "year" && ` (${selectedYear}년)`}
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center">
                <div className={`h-4 w-4 rounded ${category.color} mr-3`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {category.name}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(category.value)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`h-2 rounded-full ${category.color.replace(
                        "bg-",
                        "bg-"
                      )}`}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {category.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 주별 요약 & 일별 추이 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              주별 지출 요약
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {weeklyData.map((week, index) => {
                const maxWeeklyExpense = Math.max(
                  ...weeklyData.map((w) => w.expense)
                );
                const widthPercentage = (week.expense / maxWeeklyExpense) * 100;
                const avgDaily = week.expense / week.days;

                return (
                  <div key={week.week} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {week.week}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(week.expense)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPercentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      일평균: {formatCurrency(avgDaily)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              일별 지출 추이
            </h2>
          </div>
          <div className="p-6">
            <div className="h-48 overflow-x-auto">
              <div className="flex items-end space-x-1 h-full min-w-max">
                {dailyData.slice(0, 15).map((day, index) => {
                  const maxDailyExpense = Math.max(
                    ...dailyData.map((d) => d.expense)
                  );
                  const heightPercentage = day.hasExpense
                    ? (day.expense / maxDailyExpense) * 100
                    : 0;

                  return (
                    <div key={day.day} className="flex flex-col items-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercentage * 0.8}%` }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`w-4 rounded-t-sm ${
                          day.hasExpense
                            ? "bg-gradient-to-t from-purple-500 to-purple-400"
                            : "bg-green-200"
                        }`}
                        title={
                          day.hasExpense
                            ? formatCurrency(day.expense)
                            : "무지출일"
                        }
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {day.day}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                <span className="text-xs text-gray-600">지출 있음</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-200 rounded mr-2"></div>
                <span className="text-xs text-gray-600">무지출일</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 무지출 챌린지 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Flame className="h-5 w-5 text-orange-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              무지출 챌린지
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-1">
                {noSpendingChallenge.currentStreak}일
              </div>
              <div className="text-sm text-gray-600">현재 연속</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-1">
                {noSpendingChallenge.longestStreak}일
              </div>
              <div className="text-sm text-gray-600">최장 기록</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-1">
                {noSpendingChallenge.totalNoSpendDays}일
              </div>
              <div className="text-sm text-gray-600">이번 달 총계</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500 mb-1">
                {noSpendingChallenge.monthlyGoal}일
              </div>
              <div className="text-sm text-gray-600">월간 목표</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                월간 목표 진행률
              </span>
              <span className="text-sm text-gray-600">
                {noSpendingChallenge.totalNoSpendDays}/
                {noSpendingChallenge.monthlyGoal}일
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (noSpendingChallenge.totalNoSpendDays /
                      noSpendingChallenge.monthlyGoal) *
                    100
                  }%`,
                }}
                transition={{ duration: 1 }}
                className="h-3 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              달성 뱃지
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {noSpendingChallenge.achievements.map((achievement, index) => (
                <div
                  key={achievement.name}
                  className={`p-3 rounded-lg border text-center ${
                    achievement.achieved
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div
                    className={`text-xs font-medium ${
                      achievement.achieved
                        ? "text-emerald-700"
                        : "text-gray-500"
                    }`}
                  >
                    {achievement.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
