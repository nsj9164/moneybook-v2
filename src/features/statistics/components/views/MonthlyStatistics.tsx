import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";
import { ArrowRight, ToggleLeft, ToggleRight } from "lucide-react";
import { MonthlyStatisticsResponse } from "../../types/MonthlyStatistics";
import { useState } from "react";
import { MonthlyStats } from "../MonthlyStats/MonthlyExpenses/MonthlyStats";

export const MonthlyStatistics = ({
  monthlyData,
}: {
  monthlyData: MonthlyStatisticsResponse;
}) => {
  const { categorySummary, noSpendingDays, paymentMethods } = monthlyData;
  return (
    <div className="space-y-6">
      {/* 카테고리별 월별 지출 추이 */}
      <MonthlyStats />

      {/* 요일별 평균 지출 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              요일별 평균 지출
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
              {weekdayData.map((day, index) => {
                const maxValue = Math.max(
                  ...weekdayData.map((d) => d.avgExpense)
                );
                const height = (day.avgExpense / maxValue) * 100;
                const isWeekend = day.day === "토" || day.day === "일";

                return (
                  <div
                    key={day.day}
                    className="flex-1 flex flex-col items-center"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height * 0.8}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`w-full rounded-t-lg ${day.color} ${
                        isWeekend ? "opacity-90" : ""
                      }`}
                      title={`${day.dayName}: ${formatCurrency(
                        day.avgExpense
                      )}`}
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
              <div className="text-sm font-medium text-orange-700">
                주말 평균
              </div>
              <div className="text-lg font-bold text-orange-600">
                {formatCurrency(
                  weekdayData
                    .filter((day) => ["토", "일"].includes(day.day))
                    .reduce((sum, day) => sum + day.avgExpense, 0) / 2
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 주별 요약 & 무지출 캘린더 */}
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
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-emerald-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                무지출 캘린더
              </h2>
            </div>
          </div>
          <div className="p-6">
            {/* 무지출 통계 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1">
                  {noSpendingStats.currentMonth}일
                </div>
                <div className="text-xs text-gray-600">이번 달 무지출</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900 mr-2">
                    {noSpendingStats.lastMonth}일
                  </span>
                  <ChangeIndicator
                    current={noSpendingStats.currentMonth}
                    previous={noSpendingStats.lastMonth}
                    isPositiveGood={true}
                  />
                </div>
                <div className="text-xs text-gray-600">지난 달 대비</div>
              </div>
            </div>

            {/* 캘린더 - 크기 줄임 */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
              {calendarData.map((day) => (
                <div
                  key={day.day}
                  className="aspect-square flex flex-col items-center justify-center text-xs rounded relative border border-gray-200"
                >
                  {!day.hasExpense && <span className="text-sm mb-1">💰</span>}
                  <span className="text-xs text-gray-700">{day.day}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center space-x-4 text-xs">
              <div className="flex items-center">
                <span className="text-sm mr-2">💰</span>
                <span className="text-gray-600">무지출일</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600">숫자만: 지출일</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 지출 하이라이트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            💸 가장 많이 소비한 날
          </h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {noSpendingStats.highestSpendingDay.day}일
            </div>
            <div className="text-lg text-gray-900 mb-1">
              {formatCurrency(noSpendingStats.highestSpendingDay.amount)}
            </div>
            <div className="text-sm text-gray-500">하루 총 지출</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🛍️ 가장 큰 소비
          </h3>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600 mb-2">
              {noSpendingStats.biggestExpense.item}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(noSpendingStats.biggestExpense.amount)}
            </div>
            <div className="text-sm text-gray-500">
              {noSpendingStats.biggestExpense.date}
            </div>
          </div>
        </div>
      </div>

      {/* 결제수단별 & 고정비 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              결제수단별 지출
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {paymentMethodData.map((method, index) => (
                <div
                  key={method.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center flex-1">
                    <CreditCard className="h-4 w-4 text-gray-400 mr-3" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {method.name}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(method.value)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${method.percentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="h-2 rounded-full bg-blue-500"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {method.percentage}%
                        </span>
                        <ChangeIndicator
                          current={method.value}
                          previous={method.lastMonthValue}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">고정비</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-3">
              {fixedExpenses.map((expense, index) => (
                <div
                  key={expense.name}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {expense.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {expense.category}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-700">
                    {formatCurrency(expense.amount)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  월 고정비 총액
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(
                    fixedExpenses.reduce(
                      (sum, expense) => sum + expense.amount,
                      0
                    )
                  )}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                전체 지출의{" "}
                {(
                  (fixedExpenses.reduce(
                    (sum, expense) => sum + expense.amount,
                    0
                  ) /
                    currentData.totalExpense) *
                  100
                ).toFixed(1)}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
