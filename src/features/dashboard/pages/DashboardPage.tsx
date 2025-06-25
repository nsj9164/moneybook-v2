import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ChevronDown,
  Plus,
  CreditCard,
  PieChart,
  TrendingUp,
  Filter,
  Download,
  ExternalLink,
  AlertCircle,
  ArrowRight,
  Search,
  Bell,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/format";
import { DashboardHeader } from "../components/DashboardHeader";
import { SectionTitle } from "../components/SectionTitle";
import { OverviewCards } from "../components/OverviewCards";
import { AnalysisSection } from "../components/overview/AnalysisSection";
import { RecentTransactions } from "../components/transactions/RecentTransactions";
import { InsightsPanel } from "../components/insights/InsightsPanel";

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

// 최근 거래 데이터
const recentTransactions = [
  {
    id: 1,
    date: "2023-06-15",
    category: "식비",
    description: "스타벅스",
    amount: 5500,
    paymentMethod: "신용카드",
  },
  {
    id: 2,
    date: "2023-06-14",
    category: "교통비",
    description: "지하철 충전",
    amount: 30000,
    paymentMethod: "현금",
  },
  {
    id: 3,
    date: "2023-06-13",
    category: "쇼핑",
    description: "온라인 쇼핑",
    amount: 45000,
    paymentMethod: "신용카드",
  },
  {
    id: 4,
    date: "2023-06-12",
    category: "식비",
    description: "식료품",
    amount: 32000,
    paymentMethod: "체크카드",
  },
  {
    id: 5,
    date: "2023-06-10",
    category: "여가",
    description: "영화 티켓",
    amount: 15000,
    paymentMethod: "신용카드",
  },
];

// 주간 지출 데이터
const weeklyData = [
  { day: "월", expense: 45000 },
  { day: "화", expense: 32000 },
  { day: "수", expense: 28000 },
  { day: "목", expense: 35000 },
  { day: "금", expense: 52000 },
  { day: "토", expense: 68000 },
  { day: "일", expense: 40000 },
];

// 월간 지출 추이 데이터
const monthlyTrend = [
  { month: "1월", expense: 1100000 },
  { month: "2월", expense: 980000 },
  { month: "3월", expense: 1250000 },
  { month: "4월", expense: 1320000 },
  { month: "5월", expense: 1350000 },
  { month: "6월", expense: 1250000 },
];

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("6");
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // 전월 대비 증감률 계산
  const monthlyChangeRate =
    ((monthlyExpense - lastMonthExpense) / lastMonthExpense) * 100;
  const isIncrease = monthlyExpense > lastMonthExpense;

  // 최대 주간 지출 계산 (차트 스케일링용)
  const maxWeeklyExpense = Math.max(...weeklyData.map((day) => day.expense));

  // 최대 월간 지출 계산 (차트 스케일링용)
  const maxMonthlyExpense = Math.max(
    ...monthlyTrend.map((month) => month.expense)
  );

  // 예산 달성률 계산
  const budgetAchievementRate = (monthlyExpense / monthlyGoal) * 100;

  // 저축률 계산
  const savingsRate = (savingsAmount / monthlyIncome) * 100;

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      {/* <DashboardHeader /> */}

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 space-y-8">
        {/* 섹션 제목 */}
        <SectionTitle title={"재정 개요"} />

        {/* 주요 재정 지표 카드 */}
        {/* <OverviewCards /> */}

        {/* 섹션 제목 */}
        <SectionTitle title={"지출 분석"} divClass={"pt-4"} />

        {/* 지출 분석 및 차트 */}
        <AnalysisSection />

        {/* 섹션 제목 */}
        <SectionTitle
          title={"거래 내역 및 인사이트"}
          btnTxt={"모든 거래 보기"}
          divClass={"pt-4"}
        />

        {/* 최근 거래 및 인사이트 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 최근 거래 내역 */}
          <RecentTransactions />

          {/* 인사이트 및 팁 */}
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
