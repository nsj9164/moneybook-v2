import {
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/layout/PageHeader";
import { DateFilterControl } from "@/components/monthSelector/DateFilterControl";
import { useDateFilter } from "@/hooks/useDateFilter";

export const DashboardMain = () => {
  const {
    firstExpenseYear,
    selectedDate,
    years,
    showDateSelector,
    toggleDateSelector,
    handleChangeYear,
    handleChangeMonth,
  } = useDateFilter();

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <PageHeader title="대시보드" description="한눈에 보는 나의 재정 현황">
        <DateFilterControl
          selectedDate={selectedDate}
          showDateSelector={showDateSelector}
          years={years}
          toggleDateSelector={toggleDateSelector}
          handleChangeYear={handleChangeYear}
          handleChangeMonth={handleChangeMonth}
        />
      </PageHeader>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 space-y-6">
        {/* 핵심 지표 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 이번 달 지출 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">
                  이번 달 지출
                </p>
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

          {/* 이번 달 수입 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">
                  이번 달 수입
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {formatCurrency(monthlyIncome)}
                </h3>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-sm font-medium text-emerald-600">
                    5.2%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">전월 대비</span>
                </div>
              </div>
              <div className="bg-emerald-50 rounded-full p-3">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </motion.div>

          {/* 저축 금액 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">저축 금액</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {formatCurrency(savingsAmount)}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium text-blue-600">
                    {savingsRate.toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">저축률</span>
                </div>
              </div>
              <div className="bg-blue-50 rounded-full p-3">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          {/* 예산 달성률 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">예산 달성률</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {budgetAchievementRate.toFixed(1)}%
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">
                    목표: {formatCurrency(monthlyGoal)}
                  </span>
                </div>

                {/* <div className="flex items-center mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className={`h-2 rounded-full ${
                        budgetAchievementRate > 100
                          ? "bg-red-500"
                          : "bg-emerald-500"
                      }`}
                      style={{
                        width: `${Math.min(budgetAchievementRate, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div> */}
              </div>
              <div className="bg-purple-50 rounded-full p-3">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 요약 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 카테고리별 지출 차트 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                카테고리별 지출
              </h3>
              <Link
                to="/statistics"
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                자세히 보기
              </Link>
            </div>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={category.name} className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${category.color} mr-3 flex-shrink-0`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {category.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(category.value)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${category.percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.1 * index }}
                          className={`h-2 rounded-full ${category.color}`}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 월간 지출 추이 차트 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                월간 지출 추이
              </h3>
              <Link
                to="/statistics"
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                자세히 보기
              </Link>
            </div>
            <div className="space-y-4">
              {monthlyTrend.map((month, index) => {
                const heightPercentage =
                  (month.expense / maxMonthlyExpense) * 100;
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
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">평균 월 지출</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(
                    monthlyTrend.reduce(
                      (sum, month) => sum + month.expense,
                      0
                    ) / monthlyTrend.length
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 하단 섹션: 최근 거래 & 인사이트 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 최근 거래 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">최근 거래</h3>
              <Link
                to="/expenses"
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                전체 보기
              </Link>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        transaction.type === "income"
                          ? "bg-emerald-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowDownRight className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        transaction.type === "income"
                          ? "text-emerald-600"
                          : "text-gray-900"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 인사이트 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              인사이트
            </h3>
            <div className="space-y-4">
              {/* 예산 알림 */}
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">
                      예산 알림
                    </h4>
                    <p className="mt-1 text-xs text-amber-700">
                      식비 카테고리가 예산의 90%를 사용했습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 지출 패턴 */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">
                      지출 패턴
                    </h4>
                    <p className="mt-1 text-xs text-blue-700">
                      주말에 지출이 35% 증가했습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 절약 팁 */}
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-emerald-800">
                      절약 팁
                    </h4>
                    <p className="mt-1 text-xs text-emerald-700">
                      커피 구매를 줄이면 월 8만원을 절약할 수 있어요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                to="/statistics"
                className="w-full text-center text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center justify-center"
              >
                더 많은 인사이트 보기
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
