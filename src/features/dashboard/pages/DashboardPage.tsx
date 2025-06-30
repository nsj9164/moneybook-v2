import { useState } from "react";
import { useFetchDashboardSummary } from "../hooks/useFetchDashboardSummary";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardOnboarding } from "../components/DashboardOnboarding";

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
  const { userId } = useAuth();
  const summaryData = useFetchDashboardSummary({
    userId: userId!,
    targetDate: new Date("2025-06-28"),
  });

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

  return <DashboardOnboarding />;

  // return (
  //   {hasData ? (<DashboardMain />) : (<DashboardOnboarding />)}
  // )
};

export default Dashboard;
