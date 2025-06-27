import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ChevronDown,
  Plus,
  PieChart,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  DollarSign,
  Target,
  BarChart3,
} from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// 샘플 데이터
const monthlyExpense = 1250000;
const monthlyIncome = 3200000;
const monthlyGoal = 1500000;
const lastMonthExpense = 1350000;
const savingsAmount = monthlyIncome - monthlyExpense;

// 카테고리 데이터
const categoryData = [
  { name: "식비", value: 450000, color: "bg-rose-500", percentage: 36 },
  { name: "교통비", value: 120000, color: "bg-blue-500", percentage: 9.6 },
  { name: "주거비", value: 350000, color: "bg-amber-500", percentage: 28 },
  { name: "쇼핑", value: 180000, color: "bg-emerald-500", percentage: 14.4 },
  { name: "여가", value: 150000, color: "bg-purple-500", percentage: 12 },
];

// 월간 지출 추이 데이터 (최근 6개월)
const monthlyTrend = [
  { month: "1월", expense: 1100000 },
  { month: "2월", expense: 980000 },
  { month: "3월", expense: 1250000 },
  { month: "4월", expense: 1320000 },
  { month: "5월", expense: 1350000 },
  { month: "6월", expense: 1250000 },
];

// 최근 거래 데이터
const recentTransactions = [
  {
    id: 1,
    date: "2023-06-15",
    category: "식비",
    description: "스타벅스",
    amount: 5500,
    type: "expense",
  },
  {
    id: 2,
    date: "2023-06-14",
    category: "교통비",
    description: "지하철 충전",
    amount: 30000,
    type: "expense",
  },
  {
    id: 3,
    date: "2023-06-13",
    category: "급여",
    description: "월급",
    amount: 3200000,
    type: "income",
  },
  {
    id: 4,
    date: "2023-06-12",
    category: "식비",
    description: "식료품",
    amount: 32000,
    type: "expense",
  },
  {
    id: 5,
    date: "2023-06-11",
    category: "여가",
    description: "영화 티켓",
    amount: 15000,
    type: "expense",
  },
];

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("6");
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  // 데이터 존재 여부 확인 (실제로는 props나 context에서 가져올 것)
  const [hasData, setHasData] = useState(true); // 테스트용 상태

  // 전월 대비 증감률 계산
  const monthlyChangeRate =
    ((monthlyExpense - lastMonthExpense) / lastMonthExpense) * 100;
  const isIncrease = monthlyExpense > lastMonthExpense;

  // 예산 달성률 계산
  const budgetAchievementRate = (monthlyExpense / monthlyGoal) * 100;

  // 저축률 계산
  const savingsRate = (savingsAmount / monthlyIncome) * 100;

  // 최대 월간 지출 계산 (차트 스케일링용)
  const maxMonthlyExpense = Math.max(
    ...monthlyTrend.map((month) => month.expense)
  );

  // 데이터가 없을 때의 온보딩 화면
  if (!hasData) {
    return (
      <div className="h-full">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              MoneyBook에 오신 것을 환영합니다!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              가계부 관리를 시작하여 더 나은 재정 습관을 만들어보세요.
            </p>
          </div>
        </div>

        {/* 온보딩 콘텐츠는 기존과 동일하므로 생략 */}
        <div className="p-6 text-center">
          <div className="py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              첫 거래를 추가해보세요!
            </h2>
            <p className="text-gray-600 mb-8">
              지출과 수입을 기록하여 재정 관리를 시작하세요.
            </p>
            <Link
              to="/expenses/add"
              className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              <Plus className="mr-2 h-5 w-5" />
              거래 추가하기
            </Link>
          </div>
          <div className="mt-8">
            <button
              onClick={() => setHasData(true)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              테스트: 데이터 있는 대시보드 보기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 메인 대시보드
  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
            <p className="mt-1 text-sm text-gray-500">
              한눈에 보는 나의 재정 현황
            </p>
          </div>
          <div className="relative">
            <button
              className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setShowMonthSelector(!showMonthSelector)}
            >
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              2023년 {selectedMonth}월
              <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
            </button>

            {showMonthSelector && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 w-64">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <button
                      key={month}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
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
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/expenses/add"
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            거래 추가
          </Link>
        </div>
      </div>

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

        {/* 테스트용 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={() => setHasData(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            테스트: 빈 상태 대시보드 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
