"use client";

import { useState } from "react";
import {
  ChevronDown,
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  ArrowRight,
  Target,
  Flame,
  Plus,
  Eye,
  Award,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/format";

// 샘플 데이터
const monthlyData = [
  { month: "1월", income: 3200000, expense: 2800000 },
  { month: "2월", income: 3200000, expense: 2600000 },
  { month: "3월", income: 3200000, expense: 2900000 },
  { month: "4월", income: 3200000, expense: 2700000 },
  { month: "5월", income: 3200000, expense: 2500000 },
  { month: "6월", income: 3200000, expense: 2750000 },
];

const quarterlyData = [
  { quarter: "1분기", income: 9600000, expense: 8300000, target: 8000000 },
  { quarter: "2분기", income: 9600000, expense: 7950000, target: 8000000 },
  { quarter: "3분기", income: 9600000, expense: 8200000, target: 8000000 },
  { quarter: "4분기", income: 9600000, expense: 8100000, target: 8000000 },
];

const yearlyData = [
  { year: "2021", income: 36000000, expense: 32000000, savings: 4000000 },
  { year: "2022", income: 37200000, expense: 33500000, savings: 3700000 },
  { year: "2023", income: 38400000, expense: 32600000, savings: 5800000 },
];

const categoryData = [
  { name: "식비", value: 450000, color: "bg-rose-500", percentage: 36 },
  { name: "교통비", value: 120000, color: "bg-blue-500", percentage: 9.6 },
  { name: "주거비", value: 350000, color: "bg-amber-500", percentage: 28 },
  { name: "쇼핑", value: 180000, color: "bg-emerald-500", percentage: 14.4 },
  { name: "여가", value: 150000, color: "bg-purple-500", percentage: 12 },
];

const weeklyData = [
  { week: "1주차", expense: 180000, days: 7 },
  { week: "2주차", expense: 220000, days: 7 },
  { week: "3주차", expense: 195000, days: 7 },
  { week: "4주차", expense: 205000, days: 7 },
];

const dailyData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  expense: Math.floor(Math.random() * 100000) + 20000,
  hasExpense: Math.random() > 0.2, // 80% 확률로 지출 있음
}));

const noSpendingChallenge = {
  currentStreak: 3,
  longestStreak: 7,
  totalNoSpendDays: 12,
  monthlyGoal: 15,
  achievements: [
    { name: "첫 무지출", icon: "🎯", achieved: true },
    { name: "3일 연속", icon: "🔥", achieved: true },
    { name: "일주일 달성", icon: "⭐", achieved: true },
    { name: "월 15일 목표", icon: "🏆", achieved: false },
  ],
};

const Statistics = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("6");
  const [selectedPeriod, setSelectedPeriod] = useState("month"); // month, quarter, year
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [hasData, setHasData] = useState(true); // 데이터 존재 여부

  // 현재 기간에 따른 데이터 계산
  const getCurrentPeriodData = () => {
    if (selectedPeriod === "month") {
      const currentMonthData =
        monthlyData.find((item) => item.month === `${selectedMonth}월`) ||
        monthlyData[5];
      return {
        totalIncome: currentMonthData.income,
        totalExpense: currentMonthData.expense,
        totalSavings: currentMonthData.income - currentMonthData.expense,
      };
    } else if (selectedPeriod === "quarter") {
      const currentQuarter = Math.ceil(Number.parseInt(selectedMonth) / 3);
      const quarterData = quarterlyData[currentQuarter - 1];
      return {
        totalIncome: quarterData.income,
        totalExpense: quarterData.expense,
        totalSavings: quarterData.income - quarterData.expense,
      };
    } else {
      const yearData =
        yearlyData.find((item) => item.year === selectedYear) || yearlyData[2];
      return {
        totalIncome: yearData.income,
        totalExpense: yearData.expense,
        totalSavings: yearData.savings,
      };
    }
  };

  const currentData = getCurrentPeriodData();
  const savingsRate =
    (currentData.totalSavings / currentData.totalIncome) * 100;

  // 빈 상태 화면
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* 메인 메시지 */}
        <div className="mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            지출을 추가하면 이런 통계화면을 볼 수 있어요!
          </h2>
          <p className="text-gray-600 text-lg">
            첫 번째 지출을 기록하고 나만의 소비 패턴을 분석해보세요.
          </p>
        </div>

        {/* 기능 미리보기 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              월간/분기/연간 분석
            </h3>
            <p className="text-sm text-gray-600">
              기간별 수입과 지출을 비교하고 저축률을 추적할 수 있어요
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              카테고리별 분석
            </h3>
            <p className="text-sm text-gray-600">
              어떤 항목에 가장 많이 지출하는지 한눈에 확인할 수 있어요
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Flame className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">무지출 챌린지</h3>
            <p className="text-sm text-gray-600">
              무지출일을 기록하고 연속 기록을 달성해보세요
            </p>
          </motion.div>
        </div>

        {/* 상세 기능 설명 */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            이런 인사이트를 얻을 수 있어요
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Eye className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  주별/일별 지출 패턴
                </h4>
                <p className="text-sm text-gray-600">
                  언제 가장 많이 지출하는지 패턴을 파악할 수 있어요
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  목표 대비 성과
                </h4>
                <p className="text-sm text-gray-600">
                  설정한 예산 목표 대비 실제 지출을 비교 분석해요
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Award className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  저축률 추이
                </h4>
                <p className="text-sm text-gray-600">
                  시간에 따른 저축률 변화를 추적하고 개선점을 찾아요
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  장기 트렌드 분석
                </h4>
                <p className="text-sm text-gray-600">
                  연간 재정 상태 변화를 통해 장기적인 계획을 세워요
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => {
              // 실제로는 지출 추가 페이지로 이동
              console.log("지출 추가 페이지로 이동");
            }}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />첫 번째 지출 추가하기
          </button>
        </div>

        {/* 도움말 섹션 */}
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">
            💡 가계부 작성 팁
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-3xl mb-3">📝</div>
              <p className="text-gray-600">
                <strong>매일 기록하기</strong>
                <br />
                작은 지출도 놓치지 말고 꾸준히 기록해보세요
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-3xl mb-3">🏷️</div>
              <p className="text-gray-600">
                <strong>카테고리 활용</strong>
                <br />
                지출을 카테고리별로 분류하면 패턴을 쉽게 파악할 수 있어요
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-3xl mb-3">🎯</div>
              <p className="text-gray-600">
                <strong>목표 설정하기</strong>
                <br />
                월간 예산을 설정하고 목표 달성을 위해 노력해보세요
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderMonthlyView = () => (
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

  const renderQuarterlyView = () => (
    <div className="space-y-6">
      {/* 분기별 성과 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">분기별 성과</h2>
        </div>
        <div className="p-6">
          <div className="h-80">
            <div className="h-full flex items-end justify-between space-x-6">
              {quarterlyData.map((item, index) => {
                const maxValue = Math.max(
                  ...quarterlyData.map((d) =>
                    Math.max(d.income, d.expense, d.target)
                  )
                );
                const incomeHeight = (item.income / maxValue) * 100;
                const expenseHeight = (item.expense / maxValue) * 100;
                const targetHeight = (item.target / maxValue) * 100;
                const currentQuarter = Math.ceil(
                  Number.parseInt(selectedMonth) / 3
                );
                const isCurrentQuarter = index + 1 === currentQuarter;

                return (
                  <div
                    key={item.quarter}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full flex justify-center space-x-2 mb-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${incomeHeight * 0.7}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`w-6 rounded-t-sm ${
                          isCurrentQuarter ? "bg-emerald-500" : "bg-emerald-300"
                        }`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${expenseHeight * 0.7}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                        className={`w-6 rounded-t-sm ${
                          isCurrentQuarter ? "bg-red-500" : "bg-red-300"
                        }`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${targetHeight * 0.7}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className="w-2 rounded-t-sm bg-amber-400 border-2 border-amber-600"
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-600 mt-2">
                      {item.quarter}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      목표 {item.expense <= item.target ? "달성" : "미달성"}
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
            <div className="flex items-center">
              <div className="w-2 h-4 bg-amber-400 border border-amber-600 mr-2"></div>
              <span className="text-sm text-gray-600">목표</span>
            </div>
          </div>
        </div>
      </div>

      {/* 월별 비교 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            분기 내 월별 비교
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {monthlyData.slice(3, 6).map((month, index) => (
              <div key={month.month} className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {month.month}
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    지출:{" "}
                    <span className="font-medium text-red-600">
                      {formatCurrency(month.expense)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    저축:{" "}
                    <span className="font-medium text-emerald-600">
                      {formatCurrency(month.income - month.expense)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    저축률:{" "}
                    {(
                      ((month.income - month.expense) / month.income) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderYearlyView = () => (
    <div className="space-y-6">
      {/* 연간 추이 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            연간 재정 추이
          </h2>
        </div>
        <div className="p-6">
          <div className="h-80">
            <div className="h-full flex items-end justify-between space-x-8">
              {yearlyData.map((item, index) => {
                const maxValue = Math.max(
                  ...yearlyData.map((d) => Math.max(d.income, d.expense))
                );
                const incomeHeight = (item.income / maxValue) * 100;
                const expenseHeight = (item.expense / maxValue) * 100;
                const isCurrentYear = item.year === selectedYear;

                return (
                  <div
                    key={item.year}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full flex justify-center space-x-3 mb-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${incomeHeight * 0.7}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className={`w-8 rounded-t-sm ${
                          isCurrentYear ? "bg-emerald-500" : "bg-emerald-300"
                        }`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${expenseHeight * 0.7}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.1 }}
                        className={`w-8 rounded-t-sm ${
                          isCurrentYear ? "bg-red-500" : "bg-red-300"
                        }`}
                      />
                    </div>
                    <div className="text-lg font-medium text-gray-900 mt-2">
                      {item.year}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      저축: {formatCurrency(item.savings)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 저축률 추이 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">저축률 추이</h2>
        </div>
        <div className="p-6">
          <div className="h-48">
            <div className="h-full flex items-end justify-between space-x-4">
              {yearlyData.map((item, index) => {
                const savingsRate = (item.savings / item.income) * 100;
                const heightPercentage = (savingsRate / 20) * 100; // 20%를 최대값으로 가정

                return (
                  <div
                    key={item.year}
                    className="flex-1 flex flex-col items-center"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: `${Math.min(heightPercentage, 100)}%`,
                      }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                    />
                    <div className="text-sm font-medium text-gray-900 mt-2">
                      {item.year}
                    </div>
                    <div className="text-xs text-gray-600">
                      {savingsRate.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              💡 인사이트
            </h3>
            <p className="text-sm text-blue-800">
              2023년 저축률이 크게 개선되었습니다. 지출 관리가 효과적으로
              이루어지고 있어요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // 데이터가 없는 경우 빈 상태 화면 표시
  if (!hasData) {
    return (
      <div className="h-full">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">지출 통계</h1>
            <p className="mt-1 text-sm text-gray-500">
              지출 데이터를 분석하여 소비 패턴과 재정 상태를 파악하세요.
            </p>
          </div>
        </div>

        {/* 빈 상태 화면 */}
        {renderEmptyState()}
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">지출 통계</h1>
          <p className="mt-1 text-sm text-gray-500">
            {selectedPeriod === "month" &&
              "월간 지출 패턴을 분석하고 무지출 챌린지를 확인하세요."}
            {selectedPeriod === "quarter" &&
              "분기별 성과를 분석하고 목표 달성률을 확인하세요."}
            {selectedPeriod === "year" &&
              "연간 재정 상태를 분석하고 저축률 추이를 확인하세요."}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedPeriod === "month" && (
            <div className="relative">
              <button
                className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                onClick={() => setShowMonthSelector(!showMonthSelector)}
              >
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                {selectedYear}년 {selectedMonth}월
                <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
              </button>

              {showMonthSelector && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                      (month) => (
                        <button
                          key={month}
                          className={`px-3 py-2 text-sm rounded-md ${
                            selectedMonth === month.toString()
                              ? "bg-emerald-100 text-emerald-700 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            setSelectedMonth(month.toString());
                            setShowMonthSelector(false);
                          }}
                        >
                          {month}월
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                selectedPeriod === "month"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedPeriod("month")}
            >
              월간
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                selectedPeriod === "quarter"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedPeriod("quarter")}
            >
              분기
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                selectedPeriod === "year"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedPeriod("year")}
            >
              연간
            </button>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <Download className="mr-2 -ml-1 h-4 w-4" />
            내보내기
          </button>
          {/* 테스트용 버튼 */}
          <button
            onClick={() => setHasData(false)}
            className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            빈 상태 보기
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 py-8 space-y-6">
        {/* 통계 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {selectedPeriod === "month" && "월 수입"}
                  {selectedPeriod === "quarter" && "분기 수입"}
                  {selectedPeriod === "year" && "연 수입"}
                </p>
                <h3 className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(currentData.totalIncome)}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {selectedPeriod === "month" && "월 지출"}
                  {selectedPeriod === "quarter" && "분기 지출"}
                  {selectedPeriod === "year" && "연 지출"}
                </p>
                <h3 className="text-2xl font-bold text-red-600">
                  {formatCurrency(currentData.totalExpense)}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PieChart className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">순 저축</p>
                <h3 className="text-2xl font-bold text-blue-600">
                  {formatCurrency(currentData.totalSavings)}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">저축률</p>
                <h3 className="text-2xl font-bold text-purple-600">
                  {savingsRate.toFixed(1)}%
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* 기간별 콘텐츠 */}
        {selectedPeriod === "month" && renderMonthlyView()}
        {selectedPeriod === "quarter" && renderQuarterlyView()}
        {selectedPeriod === "year" && renderYearlyView()}

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
      </div>
    </div>
  );
};

export default Statistics;
