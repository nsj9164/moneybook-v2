import { useState } from "react";
import { PageHeader } from "@/components/common/layout/PageHeader";
import { MonthSelector } from "../components/header/MonthSelector";
import { PeriodTabs } from "../components/header/PeriodTabs";
import { ExportButton } from "../components/header/ExportButton";
import { StatisticsSummarySection } from "../components/summary/StatisticsSummarySection";

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
      <PageHeader
        title="지출 통계"
        description="지출 패턴을 분석하고 재정 상태를 파악하세요. 데이터 기반의 인사이트를 제공합니다."
      >
        <div className="flex items-center space-x-3">
          <MonthSelector />
          <PeriodTabs />
          <ExportButton />
        </div>
      </PageHeader>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 space-y-6">
        {/* 통계 요약 카드 */}
        <StatisticsSummarySection />

        {/* 월별 수입/지출 추이 */}
        {/* <IncomeExpenseByMonth /> */}

        {/* 카테고리별 지출 분석 */}
        {/* <SpendingByCategory /> */}

        {/* 시간대별 지출 패턴 */}
      </div>
    </div>
  );
};

export default Statistics;
