import { useState } from "react";
import {
  ChevronDown,
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
} from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { StatisticsNoData } from "../components/views/StatisticsNoData";
import { MonthlyStatistics } from "../components/views/MonthlyStatistics";
import { QuarterlyStatistics } from "../components/views/QuarterlyStatistics";
import { YearlyStatistics } from "../components/views/YearlyStatistics";

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
  const renderEmptyState = () => <StatisticsNoData />;

  const renderMonthlyView = () => <MonthlyStatistics />;

  const renderQuarterlyView = () => <QuarterlyStatistics />;

  const renderYearlyView = () => <YearlyStatistics />;

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
      </div>
    </div>
  );
};

export default Statistics;
