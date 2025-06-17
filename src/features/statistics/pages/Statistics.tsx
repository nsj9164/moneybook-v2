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

const categoryData = [
  { name: "식비", value: 450000, color: "bg-rose-500", percentage: 36 },
  { name: "교통비", value: 120000, color: "bg-blue-500", percentage: 9.6 },
  { name: "주거비", value: 350000, color: "bg-amber-500", percentage: 28 },
  { name: "쇼핑", value: 180000, color: "bg-emerald-500", percentage: 14.4 },
  { name: "여가", value: 150000, color: "bg-purple-500", percentage: 12 },
];

const weekdayData = [
  { day: "월", expense: 45000 },
  { day: "화", expense: 32000 },
  { day: "수", expense: 28000 },
  { day: "목", expense: 35000 },
  { day: "금", expense: 52000 },
  { day: "토", expense: 68000 },
  { day: "일", expense: 40000 },
];

const timeData = [
  { time: "오전", expense: 120000 },
  { time: "점심", expense: 180000 },
  { time: "오후", expense: 150000 },
  { time: "저녁", expense: 220000 },
  { time: "밤", expense: 80000 },
];

const Statistics = () => {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("6");
  const [selectedPeriod, setSelectedPeriod] = useState("month"); // month, quarter, year
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  // 최대값 계산 (차트 스케일링용)
  const maxBarValue = Math.max(
    ...monthlyData.map((item) => Math.max(item.income, item.expense))
  );
  const maxWeekdayValue = Math.max(...weekdayData.map((item) => item.expense));
  const maxTimeValue = Math.max(...timeData.map((item) => item.expense));

  // 현재 선택된 월의 데이터
  const currentMonthData =
    monthlyData.find((item) => item.month === `${selectedMonth}월`) ||
    monthlyData[5];

  // 총 지출 및 수입 계산
  const totalExpense = monthlyData.reduce((sum, item) => sum + item.expense, 0);
  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0);
  const totalSavings = totalIncome - totalExpense;

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">지출 통계</h1>
          <p className="mt-1 text-sm text-gray-500">
            지출 패턴을 분석하고 재정 상태를 파악하세요. 데이터 기반의
            인사이트를 제공합니다.
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
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
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
                  ))}
                </div>
              </div>
            )}
          </div>
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
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 space-y-6">
        {/* 통계 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">총 수입</p>
                <h3 className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(totalIncome)}
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
                <p className="text-sm font-medium text-gray-500">총 지출</p>
                <h3 className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalExpense)}
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
                  {formatCurrency(totalSavings)}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">저축률</p>
                <h3 className="text-2xl font-bold text-purple-600">
                  {((totalSavings / totalIncome) * 100).toFixed(1)}%
                </h3>
              </div>
            </div>
          </div>
        </div>

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
                  const incomeHeight = (item.income / maxBarValue) * 100;
                  const expenseHeight = (item.expense / maxBarValue) * 100;
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
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1 + 0.1,
                          }}
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

        {/* 카테고리별 지출 분석 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                카테고리별 지출
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

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                요일별 지출 패턴
              </h2>
            </div>
            <div className="p-6">
              <div className="h-64">
                <div className="h-full flex items-end justify-between space-x-2">
                  {weekdayData.map((item, index) => {
                    const heightPercentage =
                      (item.expense / maxWeekdayValue) * 100;
                    const isWeekend = item.day === "토" || item.day === "일";

                    return (
                      <div
                        key={item.day}
                        className="flex-1 flex flex-col items-center"
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercentage * 0.8}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`w-full rounded-t-sm ${
                            isWeekend ? "bg-purple-500" : "bg-blue-500"
                          }`}
                        />
                        <div className="mt-2 text-xs font-medium text-gray-600">
                          {item.day}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatCurrency(item.expense).replace("₩", "")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-xs text-gray-600">평일</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  <span className="text-xs text-gray-600">주말</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 시간대별 지출 패턴 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              시간대별 지출 패턴
            </h2>
          </div>
          <div className="p-6">
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
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                인사이트
              </h3>
              <p className="text-sm text-gray-600">
                저녁 시간대(18:00-22:00)에 가장 많은 지출이 발생합니다. 주로
                식비와 여가 활동에 집중되어 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
