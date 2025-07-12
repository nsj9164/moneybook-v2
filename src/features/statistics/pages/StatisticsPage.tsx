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
} from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/format";
import { StatisticsNoData } from "../components/views/StatisticsNoData";
import { useFetchMonthlyStatistics } from "../components/hooks/useFetchMonthlyStatistics";
import { useAuth } from "@/contexts/AuthContext";
import { YearlyStatistics } from "../components/views/YearlyStatistics";
import { MonthlyStatistics } from "../components/views/MonthlyStatistics";

// 샘플 데이터
// const monthlyData = [
//   { month: "1월", income: 3200000, expense: 2800000, budget: 2500000 },
//   { month: "2월", income: 3200000, expense: 2600000, budget: 2500000 },
//   { month: "3월", income: 3200000, expense: 2900000, budget: 2500000 },
//   { month: "4월", income: 3200000, expense: 2700000, budget: 2500000 },
//   { month: "5월", income: 3200000, expense: 2500000, budget: 2500000 },
//   { month: "6월", income: 3200000, expense: 2750000, budget: 2500000 },
//   { month: "7월", income: 3200000, expense: 2850000, budget: 2500000 },
//   { month: "8월", income: 3200000, expense: 2650000, budget: 2500000 },
//   { month: "9월", income: 3200000, expense: 2950000, budget: 2500000 },
//   { month: "10월", income: 3200000, expense: 2800000, budget: 2500000 },
//   { month: "11월", income: 3200000, expense: 2700000, budget: 2500000 },
//   { month: "12월", income: 3200000, expense: 2900000, budget: 2500000 },
// ];

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

const Statistics = () => {
  const { userId } = useAuth();
  const monthlyData = useFetchMonthlyStatistics({
    targetDate: "2025-06-01",
    userId: userId!,
  });
  console.log("!!!!!!!!!!!!!!!!", monthlyData);

  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("6");
  const [selectedPeriod, setSelectedPeriod] = useState("month"); // month, year
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [hasData, setHasData] = useState(true);

  // // 현재 기간에 따른 데이터 계산
  // const getCurrentPeriodData = () => {
  //   if (selectedPeriod === "month") {
  //     const currentMonthData =
  //       monthlyData.find((item) => item.month === `${selectedMonth}월`) ||
  //       monthlyData[5];
  //     return {
  //       totalIncome: currentMonthData.income,
  //       totalExpense: currentMonthData.expense,
  //       totalSavings: currentMonthData.income - currentMonthData.expense,
  //       budget: currentMonthData.budget,
  //     };
  //   } else {
  //     const yearData =
  //       yearlyData.find((item) => item.year === selectedYear) || yearlyData[2];
  //     return {
  //       totalIncome: yearData.income,
  //       totalExpense: yearData.expense,
  //       totalSavings: yearData.savings,
  //     };
  //   }
  // };

  // const currentData = getCurrentPeriodData();
  // const savingsRate =
  //   (currentData.totalSavings / currentData.totalIncome) * 100;

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
    return selectedPeriod === "month"
      ? comparisonData.monthly
      : comparisonData.yearly;
  };

  const comparison = getCurrentComparison();

  // 빈 상태 화면
  const renderEmptyState = () => <StatisticsNoData />;

  const renderMonthlyView = () => (
    <MonthlyStatistics monthlyData={monthlyData} />
  );

  // const renderYearlyView = () => (
  //   <YearlyStatistics />
  // );

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
        {/* 통계 요약 카드 - 전월/전년 대비 추가 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
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
                  {formatCurrency(10000)}
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

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
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
                  {formatCurrency(10000)}
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

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PieChart className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">순 저축</p>
                <h3 className="text-2xl font-bold text-blue-600">
                  {formatCurrency(10000)}
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

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">저축률</p>
                <h3 className="text-2xl font-bold text-purple-600">100%</h3>
                <div className="mt-1">
                  <ChangeIndicator
                    current={comparison.savingsRate.current}
                    previous={comparison.savingsRate.previous}
                    isPositiveGood={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 기간별 콘텐츠 */}
        {/* {selectedPeriod === "month" && renderMonthlyView()} */}
        {/* {selectedPeriod === "year" && renderYearlyView()} */}
      </div>
    </div>
  );
};

export default Statistics;
