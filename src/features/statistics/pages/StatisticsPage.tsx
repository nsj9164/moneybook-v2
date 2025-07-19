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
  Plus,
  Eye,
  Award,
  Clock,
  CreditCard,
  ArrowUp,
  ArrowDown,
  Minus,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/format";

// 샘플 데이터
const monthlyData = [
  { month: "1월", income: 3200000, expense: 2800000, budget: 2500000 },
  { month: "2월", income: 3200000, expense: 2600000, budget: 2500000 },
  { month: "3월", income: 3200000, expense: 2900000, budget: 2500000 },
  { month: "4월", income: 3200000, expense: 2700000, budget: 2500000 },
  { month: "5월", income: 3200000, expense: 2500000, budget: 2500000 },
  { month: "6월", income: 3200000, expense: 2750000, budget: 2500000 },
  { month: "7월", income: 3200000, expense: 0, budget: 2500000 }, // 7월 데이터 없음 시나리오를 위해 expense를 0으로 설정
  { month: "8월", income: 3200000, expense: 2650000, budget: 2500000 },
  { month: "9월", income: 3200000, expense: 2950000, budget: 2500000 },
  { month: "10월", income: 3200000, expense: 2800000, budget: 2500000 },
  { month: "11월", income: 3200000, expense: 2700000, budget: 2500000 },
  { month: "12월", income: 3200000, expense: 2900000, budget: 2500000 },
];

const yearlyData = [
  { year: "2021", income: 36000000, expense: 32000000, savings: 4000000 },
  { year: "2022", income: 37200000, expense: 33500000, savings: 3700000 },
  { year: "2023", income: 38400000, expense: 32600000, savings: 5800000 },
];

// 월별 카테고리별 지출 데이터
const monthlyCategoryData = [
  {
    month: "1월",
    categories: [
      { name: "식비", amount: 420000, color: "bg-rose-500" },
      { name: "교통비", amount: 110000, color: "bg-blue-500" },
      { name: "주거비", amount: 350000, color: "bg-amber-500" },
      { name: "쇼핑", amount: 160000, color: "bg-emerald-500" },
      { name: "여가", amount: 140000, color: "bg-purple-500" },
    ],
  },
  {
    month: "2월",
    categories: [
      { name: "식비", amount: 380000, color: "bg-rose-500" },
      { name: "교통비", amount: 100000, color: "bg-blue-500" },
      { name: "주거비", amount: 350000, color: "bg-amber-500" },
      { name: "쇼핑", amount: 140000, color: "bg-emerald-500" },
      { name: "여가", amount: 130000, color: "bg-purple-500" },
    ],
  },
  {
    month: "3월",
    categories: [
      { name: "식비", amount: 450000, color: "bg-rose-500" },
      { name: "교통비", amount: 120000, color: "bg-blue-500" },
      { name: "주거비", amount: 350000, color: "bg-amber-500" },
      { name: "쇼핑", amount: 180000, color: "bg-emerald-500" },
      { name: "여가", amount: 150000, color: "bg-purple-500" },
    ],
  },
  {
    month: "4월",
    categories: [
      { name: "식비", amount: 400000, color: "bg-rose-500" },
      { name: "교통비", amount: 115000, color: "bg-blue-500" },
      { name: "주거비", amount: 350000, color: "bg-amber-500" },
      { name: "쇼핑", amount: 170000, color: "bg-emerald-500" },
      { name: "여가", amount: 165000, color: "bg-purple-500" },
    ],
  },
  {
    month: "5월",
    categories: [
      { name: "식비", amount: 370000, color: "bg-rose-500" },
      { name: "교통비", amount: 105000, color: "bg-blue-500" },
      { name: "주거비", amount: 350000, color: "bg-amber-500" },
      { name: "쇼핑", amount: 150000, color: "bg-emerald-500" },
      { name: "여가", amount: 125000, color: "bg-purple-500" },
    ],
  },
  {
    month: "6월",
    categories: [
      { name: "식비", amount: 450000, color: "bg-rose-500" },
      { name: "교통비", amount: 120000, color: "bg-blue-500" },
      { name: "주거비", amount: 350000, color: "bg-amber-500" },
      { name: "쇼핑", amount: 180000, color: "bg-emerald-500" },
      { name: "여가", amount: 150000, color: "bg-purple-500" },
    ],
  },
];

const categoryData = [
  {
    name: "식비",
    value: 450000,
    color: "bg-rose-500",
    percentage: 36,
    lastMonthValue: 420000,
  },
  {
    name: "교통비",
    value: 120000,
    color: "bg-blue-500",
    percentage: 9.6,
    lastMonthValue: 130000,
  },
  {
    name: "주거비",
    value: 350000,
    color: "bg-amber-500",
    percentage: 28,
    lastMonthValue: 350000,
  },
  {
    name: "쇼핑",
    value: 180000,
    color: "bg-emerald-500",
    percentage: 14.4,
    lastMonthValue: 150000,
  },
  {
    name: "여가",
    value: 150000,
    color: "bg-purple-500",
    percentage: 12,
    lastMonthValue: 160000,
  },
];

const paymentMethodData = [
  { name: "신용카드", value: 850000, percentage: 68, lastMonthValue: 800000 },
  { name: "체크카드", value: 250000, percentage: 20, lastMonthValue: 280000 },
  { name: "현금", value: 100000, percentage: 8, lastMonthValue: 120000 },
  { name: "계좌이체", value: 50000, percentage: 4, lastMonthValue: 50000 },
];

// 가변적인 고정비 데이터
const fixedExpenses = [
  { name: "월세", amount: 800000, category: "주거비" },
  { name: "통신비", amount: 65000, category: "생활비" },
  { name: "보험료", amount: 120000, category: "보험" },
  { name: "구독서비스", amount: 25000, category: "여가" },
  { name: "헬스장", amount: 80000, category: "건강" },
  { name: "인터넷", amount: 35000, category: "생활비" },
];

const weeklyData = [
  { week: "1주차", expense: 180000, days: 7 },
  { week: "2주차", expense: 220000, days: 7 },
  { week: "3주차", expense: 195000, days: 7 },
  { week: "4주차", expense: 205000, days: 7 },
];

// 요일별 평균 지출 데이터
const weekdayData = [
  { day: "월", dayName: "월요일", avgExpense: 85000, color: "bg-blue-500" },
  { day: "화", dayName: "화요일", avgExpense: 92000, color: "bg-indigo-500" },
  { day: "수", dayName: "수요일", avgExpense: 78000, color: "bg-purple-500" },
  { day: "목", dayName: "목요일", avgExpense: 88000, color: "bg-pink-500" },
  { day: "금", dayName: "금요일", avgExpense: 125000, color: "bg-rose-500" },
  { day: "토", dayName: "토요일", avgExpense: 145000, color: "bg-orange-500" },
  { day: "일", dayName: "일요일", avgExpense: 110000, color: "bg-amber-500" },
];

// 캘린더 데이터 (30일)
const calendarData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  expense: Math.random() > 0.3 ? Math.floor(Math.random() * 100000) + 20000 : 0,
  hasExpense: Math.random() > 0.3,
}));

const noSpendingStats = {
  currentMonth: calendarData.filter((day) => !day.hasExpense).length,
  lastMonth: 8,
  highestSpendingDay: {
    day: 15,
    amount: 180000,
  },
  biggestExpense: {
    item: "노트북 구매",
    amount: 1200000,
    date: "6월 15일",
  },
};

// 연간 통계 데이터
const yearlyStats = {
  budgetAchievement: 85, // 예산 달성률
  topCategories: [
    { name: "식비", amount: 5400000, percentage: 45 },
    { name: "주거비", amount: 4200000, percentage: 35 },
    { name: "교통비", amount: 1440000, percentage: 12 },
  ],
  frequentItems: [
    { name: "카페", count: 156, amount: 780000 },
    { name: "편의점", count: 89, amount: 445000 },
    { name: "지하철", count: 78, amount: 234000 },
  ],
  monthlyComparison: {
    highest: { month: "12월", amount: 2900000 },
    lowest: { month: "5월", amount: 2500000 },
  },
  topPaymentMethods: [
    { name: "신용카드", amount: 8500000, percentage: 70 },
    { name: "체크카드", amount: 2400000, percentage: 20 },
    { name: "현금", amount: 1200000, percentage: 10 },
  ],
  yearlyFixedExpenses: 12120000, // 연간 고정비
};

// 전월/전년 대비 데이터
const comparisonData = {
  monthly: {
    income: { current: 3200000, previous: 3100000 },
    expense: { current: 2750000, previous: 2600000 },
    savings: { current: 450000, previous: 500000 },
    savingsRate: { current: 14.1, previous: 16.1 },
  },
  yearly: {
    income: { current: 38400000, previous: 37200000 },
    expense: { current: 32600000, previous: 33500000 },
    savings: { current: 5800000, previous: 3700000 },
    savingsRate: { current: 15.1, previous: 9.9 },
  },
};

// 현재 월과 지난 달 카테고리별 데이터
const currentMonthCategories = [
  {
    name: "식비",
    currentMonth: 450000,
    lastMonth: 420000,
    color: "bg-rose-500",
  },
  {
    name: "교통비",
    currentMonth: 120000,
    lastMonth: 130000,
    color: "bg-blue-500",
  },
  {
    name: "주거비",
    currentMonth: 350000,
    lastMonth: 350000,
    color: "bg-amber-500",
  },
  {
    name: "쇼핑",
    currentMonth: 180000,
    lastMonth: 150000,
    color: "bg-emerald-500",
  },
  {
    name: "여가",
    currentMonth: 150000,
    lastMonth: 160000,
    color: "bg-purple-500",
  },
];

// 고정된 목표 금액 (예시)
const MONTHLY_BUDGET_GOAL = 2500000; // 월간 예산 목표
const YEARLY_BUDGET_GOAL = 30000000; // 연간 예산 목표

const Statistics = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("7"); // 7월로 설정 (데이터가 없는 달)
  const [selectedPeriod, setSelectedPeriod] = useState("month"); // month, year
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [hasData, setHasData] = useState(true); // 전체 데이터 유무 (완전 빈 상태)
  const [hasCurrentMonthData, setHasCurrentMonthData] = useState(false); // 현재 선택된 달의 데이터 유무
  const [hasPreviousMonthData, setHasPreviousMonthData] = useState(true); // 이전 달 데이터 유무 (7월 선택 시 6월 데이터)
  const [showIncome, setShowIncome] = useState(false); // 수입/지출 토글

  // 현재 기간에 따른 데이터 계산
  const getCurrentPeriodData = () => {
    if (selectedPeriod === "month") {
      // 현재 달 데이터가 없고, 이전 달 데이터도 없는 경우
      if (!hasCurrentMonthData && !hasPreviousMonthData) {
        return {
          totalIncome: 0,
          totalExpense: 0,
          totalSavings: 0,
          budget: MONTHLY_BUDGET_GOAL, // 목표 금액은 유지
        };
      }
      // 현재 달 데이터는 없지만, 이전 달 데이터는 있는 경우 (예상치 사용)
      if (!hasCurrentMonthData && hasPreviousMonthData) {
        const previousMonthIndex = monthlyData.findIndex(
          (item) => item.month === `${Number.parseInt(selectedMonth) - 1}월`
        );
        const previousMonthData =
          monthlyData[previousMonthIndex] || monthlyData[5]; // 이전 달 데이터가 없으면 6월 데이터 사용
        return {
          totalIncome: previousMonthData.income,
          totalExpense: 0, // 현재 지출은 0
          totalSavings: previousMonthData.income, // 저축은 수입과 동일 (지출이 없으므로)
          budget: previousMonthData.budget,
        };
      }
      // 현재 달 데이터가 있는 경우
      const currentMonthActualData =
        monthlyData.find((item) => item.month === `${selectedMonth}월`) ||
        monthlyData[5];
      return {
        totalIncome: currentMonthActualData.income,
        totalExpense: currentMonthActualData.expense,
        totalSavings:
          currentMonthActualData.income - currentMonthActualData.expense,
        budget: currentMonthActualData.budget,
      };
    } else {
      // 연간 데이터의 경우, 전체 데이터가 없거나 모든 기간 데이터가 없는 경우 0으로 처리
      if (
        !hasData ||
        (!hasCurrentMonthData &&
          !hasPreviousMonthData &&
          selectedPeriod === "year")
      ) {
        return {
          totalIncome: 0,
          totalExpense: 0,
          totalSavings: 0,
          budget: YEARLY_BUDGET_GOAL,
        };
      }
      const yearData =
        yearlyData.find((item) => item.year === selectedYear) || yearlyData[2];
      return {
        totalIncome: yearData.income,
        totalExpense: yearData.expense,
        totalSavings: yearData.savings,
        budget: YEARLY_BUDGET_GOAL, // 연간 목표 금액
      };
    }
  };

  const currentData = getCurrentPeriodData();
  const savingsRate =
    currentData.totalIncome === 0
      ? 0
      : (currentData.totalSavings / currentData.totalIncome) * 100;

  // 예산 달성률 계산
  const getBudgetAchievement = () => {
    let goal = 0;
    let current = 0;
    if (selectedPeriod === "month") {
      goal = currentData.budget || MONTHLY_BUDGET_GOAL;
      current = currentData.totalExpense;
    } else {
      goal = YEARLY_BUDGET_GOAL;
      current = currentData.totalExpense;
    }

    // 데이터가 없는 경우 달성률 0%
    if (
      (selectedPeriod === "month" &&
        !hasCurrentMonthData &&
        !hasPreviousMonthData) ||
      (selectedPeriod === "year" &&
        !hasData &&
        !hasCurrentMonthData &&
        !hasPreviousMonthData)
    ) {
      return { percentage: 0, goalAmount: goal };
    }

    const percentage = (current / goal) * 100;
    return { percentage: Math.min(100, percentage), goalAmount: goal };
  };

  const {
    percentage: budgetAchievementPercentage,
    goalAmount: budgetGoalAmount,
  } = getBudgetAchievement();

  // 변화율 계산 함수
  const getChangePercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // 변화 표시 컴포넌트
  const ChangeIndicator = ({
    current,
    previous,
    isPositiveGood = false,
  }: {
    current: number;
    previous: number;
    isPositiveGood?: boolean;
  }) => {
    const change = current - previous;
    const changePercent = getChangePercentage(current, previous);

    if (change === 0) {
      return (
        <div className="flex items-center text-xs text-gray-500">
          <Minus className="w-3 h-3 mr-1" />
          <span>변화없음</span>
        </div>
      );
    }

    const isIncrease = change > 0;
    const isGood = isPositiveGood ? isIncrease : !isIncrease;

    return (
      <div
        className={`flex items-center text-xs ${
          isGood ? "text-emerald-500" : "text-red-500"
        }`}
      >
        {isIncrease ? (
          <ArrowUp className="w-3 h-3 mr-1" />
        ) : (
          <ArrowDown className="w-3 h-3 mr-1" />
        )}
        <span>{Math.abs(changePercent).toFixed(1)}%</span>
      </div>
    );
  };

  // 현재 기간의 비교 데이터 가져오기
  const getCurrentComparison = () => {
    // 데이터가 없는 경우 비교 데이터도 0으로 처리
    if (
      (selectedPeriod === "month" &&
        !hasCurrentMonthData &&
        !hasPreviousMonthData) ||
      (selectedPeriod === "year" &&
        !hasData &&
        !hasCurrentMonthData &&
        !hasPreviousMonthData)
    ) {
      return {
        income: { current: 0, previous: 0 },
        expense: { current: 0, previous: 0 },
        savings: { current: 0, previous: 0 },
        savingsRate: { current: 0, previous: 0 },
      };
    }
    return selectedPeriod === "month"
      ? comparisonData.monthly
      : comparisonData.yearly;
  };

  const comparison = getCurrentComparison();

  // 빈 상태 화면 (첫 진입 시 - 온보딩)
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
            <h3 className="font-semibold text-gray-900 mb-2">월간/연간 분석</h3>
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
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">무지출 캘린더</h3>
            <p className="text-sm text-gray-600">
              무지출일을 캘린더에서 확인하고 패턴을 분석해보세요
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
                  지출 패턴 분석
                </h4>
                <p className="text-sm text-gray-600">
                  언제, 어디서, 얼마나 지출하는지 상세한 패턴을 파악할 수 있어요
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  예산 대비 성과
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

  // 현재 달 또는 이전 달 데이터가 없는 경우의 화면
  const renderNoDataForPeriodState = (hasPrevData: boolean) => (
    <div className="space-y-6">
      {/* 알림 배너 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">
              {hasPrevData
                ? `${selectedMonth}월 데이터가 아직 없어요`
                : "선택된 기간의 데이터가 없어요"}
            </h3>
            <p className="text-amber-700 mb-4">
              {hasPrevData
                ? `이번 달 지출을 기록하면 지난 달과 비교한 상세한 통계를 볼 수 있어요. 지금까지의 데이터를 바탕으로 이번 달 예상 지출을 확인해보세요.`
                : `지출을 기록하면 상세한 통계를 확인할 수 있어요. 지금 바로 첫 지출을 추가해보세요!`}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  console.log("지출 추가 페이지로 이동");
                }}
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                지출 추가하기
              </button>
              {hasPrevData && (
                <button
                  onClick={() => {
                    setSelectedMonth("6"); // 지난 달 보기
                    setHasCurrentMonthData(true); // 지난 달은 데이터 있다고 가정
                  }}
                  className="inline-flex items-center px-4 py-2 bg-white text-amber-700 text-sm font-medium rounded-lg border border-amber-300 hover:bg-amber-50 transition-colors"
                >
                  지난 달 보기 (6월)
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 예상 통계 또는 데이터 없음 표시 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 수입 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">예상 월 수입</p>
              <h3 className="text-2xl font-bold text-gray-400">
                {hasPrevData ? formatCurrency(3200000) : "₩0"}
              </h3>
              <div className="mt-1">
                <span className="text-xs text-gray-400">
                  {hasPrevData ? "지난 달 기준" : "데이터 없음"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 지출 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">현재 지출</p>
              <h3 className="text-2xl font-bold text-gray-900">₩0</h3>
              <div className="mt-1">
                <span className="text-xs text-amber-600">데이터 없음</span>
              </div>
            </div>
          </div>
        </div>

        {/* 저축 금액 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PieChart className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">
                예상 저축 금액
              </p>
              <h3 className="text-2xl font-bold text-gray-400">
                {hasPrevData ? formatCurrency(3200000) : "₩0"}
              </h3>
              <div className="mt-1">
                <span className="text-xs text-gray-400">지출 기록 후 계산</span>
              </div>
            </div>
          </div>
        </div>

        {/* 예상 달성률 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">예상 달성률</p>
              <h3 className="text-2xl font-bold text-gray-400">0%</h3>
              <div className="mt-1">
                <div className="text-xs text-gray-500 mb-1">
                  목표:{" "}
                  {hasPrevData ? formatCurrency(MONTHLY_BUDGET_GOAL) : "₩0"}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `0%` }}
                    transition={{ duration: 0.5 }}
                    className="h-2 rounded-full bg-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 지난 달 데이터 표시 (hasPrevData일 때만) */}
      {hasPrevData && (
        <>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  지난 달 데이터 (6월)
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">데이터 있음</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {formatCurrency(2750000)}
                  </div>
                  <div className="text-sm text-emerald-700">6월 총 지출</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatCurrency(450000)}
                  </div>
                  <div className="text-sm text-blue-700">6월 저축액</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    14.1%
                  </div>
                  <div className="text-sm text-purple-700">6월 저축률</div>
                </div>
              </div>
            </div>
          </div>

          {/* 지난 달 카테고리별 지출 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                지난 달 카테고리별 지출 (6월)
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {currentMonthCategories.map((category, index) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 ${category.color} rounded mr-3`}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">
                        {formatCurrency(category.lastMonth)}
                      </div>
                      <div className="text-xs text-gray-500">지난 달</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 이번 달 목표 설정 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                이번 달 목표를 세워보세요!
              </h3>
              <p className="text-blue-700 mb-6">
                지난 달 데이터를 참고해서 {selectedMonth}월 지출 목표를 설정하고
                계획적인 소비를 시작해보세요.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    지난 달 대비 10% 절약
                  </div>
                  <div className="text-sm text-gray-600">
                    목표: {formatCurrency(2750000 * 0.9)}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    저축률 20% 달성
                  </div>
                  <div className="text-sm text-gray-600">
                    목표: {formatCurrency(3200000 * 0.2)}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    식비 30만원 이하
                  </div>
                  <div className="text-sm text-gray-600">
                    지난 달: {formatCurrency(450000)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderMonthlyView = () => (
    <div className="space-y-6">
      {/* 카테고리별 월별 지출 추이 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              카테고리별 월별 추이
            </h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowIncome(!showIncome)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {showIncome ? (
                  <>
                    <ToggleRight className="w-5 h-5 text-emerald-600 mr-2" />
                    수입 보기
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-5 h-5 text-gray-400 mr-2" />
                    지출 보기
                  </>
                )}
              </button>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                <span>상세 보기</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {showIncome ? (
            // 수입 차트 (기존 유지)
            <div className="h-80">
              <div className="h-full flex items-end justify-between space-x-4">
                {monthlyData.slice(0, 6).map((item, index) => {
                  const maxValue = Math.max(
                    ...monthlyData.map((d) => d.income)
                  );
                  const height = (item.income / maxValue) * 100;
                  const isCurrentMonth = item.month === `${selectedMonth}월`;

                  return (
                    <div
                      key={item.month}
                      className="flex-1 flex flex-col items-center"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height * 0.8}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`w-full rounded-t-lg ${
                          isCurrentMonth ? "bg-emerald-500" : "bg-emerald-300"
                        }`}
                        title={`수입: ${formatCurrency(item.income)}`}
                      />
                      <div className="text-xs font-medium text-gray-600 mt-2">
                        {item.month}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatCurrency(item.income)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // 카테고리별 지출 비교 차트
            <div className="h-80">
              <div className="h-full flex items-end justify-between space-x-6">
                {currentMonthCategories.map((category, index) => {
                  const maxValue = Math.max(
                    ...currentMonthCategories.flatMap((c) => [
                      c.currentMonth,
                      c.lastMonth,
                    ])
                  );
                  const currentHeight =
                    (category.currentMonth / maxValue) * 100;
                  const lastHeight = (category.lastMonth / maxValue) * 100;

                  return (
                    <div
                      key={category.name}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div className="w-full flex justify-center space-x-2 mb-2">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${lastHeight * 0.8}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`w-6 rounded-t-sm ${category.color
                            .replace("bg-", "bg-")
                            .replace("-500", "-300")}`}
                          title={`지난달: ${formatCurrency(
                            category.lastMonth
                          )}`}
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${currentHeight * 0.8}%` }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1 + 0.1,
                          }}
                          className={`w-6 rounded-t-sm ${category.color}`}
                          title={`이번달: ${formatCurrency(
                            category.currentMonth
                          )}`}
                        />
                      </div>
                      <div className="text-xs font-medium text-gray-600 mt-2">
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatCurrency(category.currentMonth)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!showIncome && (
            <div className="mt-6 flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
                <span className="text-sm text-gray-600">지난달</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-700 rounded mr-2"></div>
                <span className="text-sm text-gray-600">이번달</span>
              </div>
            </div>
          )}
        </div>
      </div>

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
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-700">
                평일 평균 (월~금)
              </div>
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
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-sm font-medium text-orange-700">
                주말 평균 (토~일)
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

  const renderYearlyView = () => (
    <div className="space-y-6">
      {/* 월별 수입/지출/저축 추이 (기존 월간에서 이동) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              월별 재정 추이
            </h2>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
              <span>상세 보기</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="h-80">
            <div className="h-full flex items-end justify-between space-x-2">
              {monthlyData.map((item, index) => {
                const maxValue = Math.max(
                  ...monthlyData.map((d) => Math.max(d.income, d.expense))
                );
                const incomeHeight = (item.income / maxValue) * 100;
                const expenseHeight = (item.expense / maxValue) * 100;
                const savingsHeight =
                  ((item.income - item.expense) / maxValue) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full flex justify-center space-x-1 mb-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${incomeHeight * 0.7}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="w-2 rounded-t-sm bg-emerald-500"
                        title={`수입: ${formatCurrency(item.income)}`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${expenseHeight * 0.7}%` }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.05 + 0.1,
                        }}
                        className="w-2 rounded-t-sm bg-red-500"
                        title={`지출: ${formatCurrency(item.expense)}`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${savingsHeight * 0.7}%` }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.05 + 0.2,
                        }}
                        className="w-2 rounded-t-sm bg-blue-500"
                        title={`저축: ${formatCurrency(
                          item.income - item.expense
                        )}`}
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
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">저축</span>
            </div>
          </div>
        </div>
      </div>

      {/* 연간 재정 추이 */}
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
                  ...yearlyData.map((d) =>
                    Math.max(d.income, d.expense, d.savings)
                  )
                );
                const incomeHeight = (item.income / maxValue) * 100;
                const expenseHeight = (item.expense / maxValue) * 100;
                const savingsHeight = (item.savings / maxValue) * 100;
                const isCurrentYear = item.year === selectedYear;

                return (
                  <div
                    key={item.year}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full flex justify-center space-x-2 mb-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${incomeHeight * 0.7}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className={`w-6 rounded-t-sm ${
                          isCurrentYear ? "bg-emerald-500" : "bg-emerald-300"
                        }`}
                        title={`수입: ${formatCurrency(item.income)}`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${expenseHeight * 0.7}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.1 }}
                        className={`w-6 rounded-t-sm ${
                          isCurrentYear ? "bg-red-500" : "bg-red-300"
                        }`}
                        title={`지출: ${formatCurrency(item.expense)}`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${savingsHeight * 0.7}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                        className={`w-6 rounded-t-sm ${
                          isCurrentYear ? "bg-blue-500" : "bg-blue-300"
                        }`}
                        title={`저축: ${formatCurrency(item.savings)}`}
                      />
                    </div>
                    <div className="text-lg font-medium text-gray-900 mt-2">
                      {item.year}
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
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">저축</span>
            </div>
          </div>
        </div>
      </div>

      {/* 예산 달성률 & 월별 비교 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">예산 달성률</h2>
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {yearlyStats.budgetAchievement}%
              </div>
              <div className="text-sm text-gray-600">연간 예산 목표 달성률</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${yearlyStats.budgetAchievement}%` }}
                transition={{ duration: 1 }}
                className="h-4 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              />
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600">
                {yearlyStats.budgetAchievement >= 100
                  ? "🎉 목표 달성!"
                  : "💪 목표까지 조금 더!"}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              월별 지출 비교
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-red-700">
                    가장 높은 달
                  </div>
                  <div className="text-lg font-bold text-red-600">
                    {yearlyStats.monthlyComparison.highest.month}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">
                    {formatCurrency(
                      yearlyStats.monthlyComparison.highest.amount
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-emerald-700">
                    가장 낮은 달
                  </div>
                  <div className="text-lg font-bold text-emerald-600">
                    {yearlyStats.monthlyComparison.lowest.month}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-600">
                    {formatCurrency(
                      yearlyStats.monthlyComparison.lowest.amount
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600 text-center">
                  차이:{" "}
                  {formatCurrency(
                    yearlyStats.monthlyComparison.highest.amount -
                      yearlyStats.monthlyComparison.lowest.amount
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 소비 TOP 3 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              소비가 높은 카테고리 TOP 3
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {yearlyStats.topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(category.amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              소비가 잦은 항목 TOP 3
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {yearlyStats.frequentItems.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.count}회 이용
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(item.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 결제수단 & 고정비 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              많이 사용한 결제수단 TOP 3
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {yearlyStats.topPaymentMethods.map((method, index) => (
                <div key={method.name} className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {method.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(method.amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${method.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">연간 고정비</h2>
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {formatCurrency(yearlyStats.yearlyFixedExpenses)}
              </div>
              <div className="text-sm text-gray-600">연간 고정비 총액</div>
            </div>

            <div className="space-y-3">
              {fixedExpenses.map((expense) => (
                <div
                  key={expense.name}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-sm text-gray-700">{expense.name}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(expense.amount * 12)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-amber-50 rounded-lg">
              <div className="text-sm text-amber-800 text-center">
                💡 고정비는 전체 지출의{" "}
                {(
                  (yearlyStats.yearlyFixedExpenses / currentData.totalExpense) *
                  100
                ).toFixed(1)}
                %를 차지해요
              </div>
            </div>
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

  // 현재 달 데이터가 없거나, 현재 달/이전 달 모두 데이터가 없는 경우
  if (selectedPeriod === "month" && !hasCurrentMonthData) {
    return (
      <div className="h-full">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">지출 통계</h1>
            <p className="mt-1 text-sm text-gray-500">
              {!hasCurrentMonthData && !hasPreviousMonthData
                ? "선택된 기간의 데이터가 없어요."
                : `${selectedMonth}월 데이터를 추가하면 더 정확한 통계를 확인할 수 있어요.`}
            </p>
          </div>
          <div className="flex items-center space-x-3">
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
                            // 7월을 선택하면 현재 달 데이터가 없는 것으로 처리
                            if (month === 7) {
                              setHasCurrentMonthData(false);
                            } else {
                              setHasCurrentMonthData(true);
                            }
                            // 월 선택 시 이전 달 데이터 유무는 유지 (테스트 버튼으로만 변경)
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
            <button
              type="button"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Download className="mr-2 -ml-1 h-4 w-4" />
              내보내기
            </button>
            {/* 테스트용 버튼들 */}
            <button
              onClick={() => {
                setHasData(true); // Ensure not in overall empty state
                setHasCurrentMonthData(false);
                setHasPreviousMonthData(false);
                setSelectedMonth("7"); // Set to a month that would normally be empty
              }}
              className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              모든 데이터 없음
            </button>
            <button
              onClick={() => {
                setHasData(true);
                setHasCurrentMonthData(false);
                setHasPreviousMonthData(true);
                setSelectedMonth("7"); // Set to a month that would normally be empty
              }}
              className="text-xs px-3 py-1 bg-amber-100 text-amber-600 rounded hover:bg-amber-200"
            >
              현재 달 없음
            </button>
            <button
              onClick={() => {
                setHasData(false);
                setHasCurrentMonthData(false);
                setHasPreviousMonthData(false);
              }}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
            >
              완전 빈 상태
            </button>
            <button
              onClick={() => {
                setHasData(true);
                setHasCurrentMonthData(true);
                setHasPreviousMonthData(true);
                setSelectedMonth("6"); // Set to a month with data
              }}
              className="text-xs px-3 py-1 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200"
            >
              데이터 있음
            </button>
          </div>
        </div>

        {/* 현재 달 데이터 없음 화면 또는 모든 데이터 없음 화면 */}
        <div className="p-6 py-8">
          {renderNoDataForPeriodState(hasPreviousMonthData)}
        </div>
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
              "월간 지출 패턴을 분석하고 무지출 캘린더를 확인하세요."}
            {selectedPeriod === "year" &&
              "연간 재정 상태를 분석하고 소비 패턴을 확인하세요."}
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
                            // 7월을 선택하면 현재 달 데이터가 없는 것으로 처리
                            if (month === 7) {
                              setHasCurrentMonthData(false);
                            } else {
                              setHasCurrentMonthData(true);
                            }
                            // 월 선택 시 이전 달 데이터 유무는 유지 (테스트 버튼으로만 변경)
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
          {/* 테스트용 버튼들 */}
          <button
            onClick={() => {
              setHasData(true); // Ensure not in overall empty state
              setHasCurrentMonthData(false);
              setHasPreviousMonthData(false);
              setSelectedMonth("7"); // Set to a month that would normally be empty
            }}
            className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            모든 데이터 없음
          </button>
          <button
            onClick={() => {
              setHasData(true);
              setHasCurrentMonthData(false);
              setHasPreviousMonthData(true);
              setSelectedMonth("7"); // Set to a month that would normally be empty
            }}
            className="text-xs px-3 py-1 bg-amber-100 text-amber-600 rounded hover:bg-amber-200"
          >
            현재 달 없음
          </button>
          <button
            onClick={() => {
              setHasData(false);
              setHasCurrentMonthData(false);
              setHasPreviousMonthData(false);
            }}
            className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
          >
            완전 빈 상태
          </button>
          <button
            onClick={() => {
              setHasData(true);
              setHasCurrentMonthData(true);
              setHasPreviousMonthData(true);
              setSelectedMonth("6"); // Set to a month with data
            }}
            className="text-xs px-3 py-1 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200"
          >
            데이터 있음
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 py-8 space-y-6">
        {/* 통계 요약 카드 - 전월/전년 대비 추가 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
            <div className="absolute top-3 right-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">
                  {selectedPeriod === "month" && "월 수입"}
                  {selectedPeriod === "year" && "연 수입"}
                </p>
                <h3 className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(currentData.totalIncome)}
                </h3>
                <div className="mt-1">
                  <ChangeIndicator
                    current={comparison.income.current}
                    previous={comparison.income.previous}
                    isPositiveGood={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
            <div className="absolute top-3 right-3">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">
                  {selectedPeriod === "month" && "월 지출"}
                  {selectedPeriod === "year" && "연 지출"}
                </p>
                <h3 className="text-2xl font-bold text-red-600">
                  {formatCurrency(currentData.totalExpense)}
                </h3>
                <div className="mt-1">
                  <ChangeIndicator
                    current={comparison.expense.current}
                    previous={comparison.expense.previous}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
            <div className="absolute top-3 right-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PieChart className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">저축 금액</p>
                <h3 className="text-2xl font-bold text-blue-600">
                  {formatCurrency(currentData.totalSavings)}
                </h3>
                <div className="mt-1">
                  <ChangeIndicator
                    current={comparison.savings.current}
                    previous={comparison.savings.previous}
                    isPositiveGood={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
            <div className="absolute top-3 right-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">예상 달성률</p>
                <h3 className="text-2xl font-bold text-purple-600">
                  {budgetAchievementPercentage.toFixed(1)}%
                </h3>
                <div className="mt-1">
                  <ChangeIndicator
                    current={comparison.savingsRate.current}
                    previous={comparison.savingsRate.previous}
                    isPositiveGood={true}
                  />
                  <div className="text-xs text-gray-500 mt-1 mb-1">
                    목표: {formatCurrency(budgetGoalAmount)}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${budgetAchievementPercentage}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-2 rounded-full bg-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 기간별 콘텐츠 */}
        {selectedPeriod === "month" && renderMonthlyView()}
        {selectedPeriod === "year" && renderYearlyView()}
      </div>
    </div>
  );
};

export default Statistics;
