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
} from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";

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
    <div>
      {/* 상단 헤더 영역 */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">재정 현황</h1>
          <div className="ml-4 relative">
            <button
              className="flex items-center bg-gray-100 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700"
              onClick={() => setShowMonthSelector(!showMonthSelector)}
            >
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              2023년 {selectedMonth}월
              <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
            </button>

            {showMonthSelector && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 p-2 z-10">
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <button
                      key={month}
                      className={`px-3 py-1.5 text-sm rounded-md ${
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
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-4 md:p-6">
        {/* 주요 재정 지표 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* 이번 달 총 지출 */}
          <div className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  이번 달 총 지출
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(monthlyExpense)}
                </h3>
              </div>
              <div
                className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  isIncrease
                    ? "bg-red-100 text-red-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {isIncrease ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(monthlyChangeRate).toFixed(1)}%
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              전월 대비 {isIncrease ? "증가" : "감소"}
            </p>

            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-500">
                  목표 대비
                </span>
                <span className="text-xs font-medium text-gray-700">
                  {Math.round(budgetAchievementRate)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    budgetAchievementRate > 100
                      ? "bg-red-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(budgetAchievementRate, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                목표: {formatCurrency(monthlyGoal)}
              </p>
            </div>
          </div>

          {/* 이번 달 총 수입 */}
          <div className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  이번 달 총 수입
                </p>
                <h3 className="text-2xl font-bold text-blue-600 mt-1">
                  {formatCurrency(monthlyIncome)}
                </h3>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">급여, 부수입 포함</p>

            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-500">
                  지출 비율
                </span>
                <span className="text-xs font-medium text-gray-700">
                  {Math.round((monthlyExpense / monthlyIncome) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-blue-500"
                  style={{
                    width: `${Math.min(
                      (monthlyExpense / monthlyIncome) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* 이번 달 저축 */}
          <div className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  이번 달 저축
                </p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-1">
                  {formatCurrency(savingsAmount)}
                </h3>
              </div>
              <div className="flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                {savingsRate.toFixed(1)}%
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">수입 대비 저축률</p>

            <div className="mt-3 flex items-center">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-500">
                    목표 달성률
                  </span>
                  <span className="text-xs font-medium text-gray-700">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-emerald-500"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* 고정 지출 */}
          <div className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">고정 지출</p>
                <h3 className="text-2xl font-bold text-purple-600 mt-1">
                  {formatCurrency(555000)}
                </h3>
              </div>
              <div className="flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {Math.round((555000 / monthlyExpense) * 100)}%
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">총 지출 대비 비율</p>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>월세: {formatCurrency(500000)}</span>
                <span>통신비: {formatCurrency(55000)}</span>
              </div>
              <div className="mt-2">
                <button className="text-xs text-purple-600 font-medium hover:text-purple-700 flex items-center">
                  고정 지출 관리
                  <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 지출 분석 및 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* 카테고리별 지출 */}
          <div className="bg-white rounded-xl border shadow-sm lg:col-span-1">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold text-gray-900">
                  카테고리별 지출
                </h2>
                <button className="text-xs text-emerald-600 font-medium hover:text-emerald-700 flex items-center">
                  자세히 보기
                  <ExternalLink className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex flex-col items-center mb-4">
                <div className="relative h-48 w-48">
                  <DonutChart data={categoryData} />
                </div>
              </div>

              <div className="space-y-3">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center">
                    <div
                      className={`h-3 w-3 rounded-full ${category.color} mr-3`}
                    />
                    <div className="flex-1 text-sm font-medium text-gray-700">
                      {category.name}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(category.value)}
                    </div>
                    <div className="ml-2 text-xs text-gray-500 w-10 text-right">
                      {category.percentage}%
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <button className="w-full text-center text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center justify-center">
                  <PieChart className="mr-1.5 h-4 w-4" />
                  예산 설정하기
                </button>
              </div>
            </div>
          </div>

          {/* 지출 추이 */}
          <div className="bg-white rounded-xl border shadow-sm lg:col-span-2">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold text-gray-900">
                  지출 추이
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-medium">
                    월간
                  </button>
                  <button className="text-xs text-gray-500 px-2 py-1 rounded-md hover:bg-gray-50">
                    주간
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="h-64">
                {/* 월간 지출 추이 차트 */}
                <div className="h-full flex items-end space-x-2">
                  {monthlyTrend.map((item, index) => {
                    const heightPercentage =
                      (item.expense / maxMonthlyExpense) * 100;
                    const isCurrentMonth = item.month === `${selectedMonth}월`;

                    return (
                      <div
                        key={item.month}
                        className="flex-1 flex flex-col items-center"
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercentage * 0.8}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`w-full rounded-t-sm ${
                            isCurrentMonth ? "bg-emerald-500" : "bg-emerald-200"
                          }`}
                        />
                        <div className="mt-2 text-xs font-medium text-gray-600">
                          {item.month}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatCurrency(item.expense).replace("₩", "")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      평균 월 지출
                    </p>
                    <p className="text-xs text-gray-500">최근 6개월</p>
                  </div>
                  <div className="text-lg font-bold text-emerald-600">
                    {formatCurrency(
                      monthlyTrend.reduce(
                        (sum, month) => sum + month.expense,
                        0
                      ) / monthlyTrend.length
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 최근 거래 및 인사이트 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 최근 거래 내역 */}
          <div className="bg-white rounded-xl border shadow-sm lg:col-span-2">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold text-gray-900">
                  최근 거래 내역
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          transaction.category === "식비"
                            ? "bg-rose-100"
                            : transaction.category === "교통비"
                            ? "bg-blue-100"
                            : transaction.category === "쇼핑"
                            ? "bg-emerald-100"
                            : transaction.category === "여가"
                            ? "bg-purple-100"
                            : "bg-amber-100"
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            transaction.category === "식비"
                              ? "text-rose-600"
                              : transaction.category === "교통비"
                              ? "text-blue-600"
                              : transaction.category === "쇼핑"
                              ? "text-emerald-600"
                              : transaction.category === "여가"
                              ? "text-purple-600"
                              : "text-amber-600"
                          }`}
                        >
                          {transaction.category.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.date} · {transaction.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <button className="w-full text-center text-sm text-emerald-600 font-medium hover:text-emerald-700">
                모든 거래 보기
              </button>
            </div>
          </div>

          {/* 인사이트 및 팁 */}
          <div className="bg-white rounded-xl border shadow-sm lg:col-span-1">
            <div className="p-4 border-b">
              <h2 className="text-base font-semibold text-gray-900">
                인사이트
              </h2>
            </div>

            <div className="p-4 space-y-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      지출 패턴
                    </h3>
                    <p className="mt-1 text-xs text-blue-700">
                      주말에 지출이 35% 증가했습니다. 주로 여가 활동에 지출이
                      집중되어 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">
                      예산 알림
                    </h3>
                    <p className="mt-1 text-xs text-amber-700">
                      식비 카테고리가 예산의 90%를 사용했습니다. 이번 달 지출을
                      조절하는 것이 좋겠습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-emerald-800">
                      절약 팁
                    </h3>
                    <p className="mt-1 text-xs text-emerald-700">
                      정기 구독 서비스를 검토해보세요. 현재 5개의 구독 서비스에
                      월 45,000원을 지출하고 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <button className="w-full text-center text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center justify-center">
                  <Plus className="mr-1.5 h-4 w-4" />
                  맞춤 인사이트 더 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 도넛 차트 컴포넌트
function DonutChart({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="#e2e8f0"
        strokeWidth="20"
      />
      {data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const startAngle = cumulativePercentage * 3.6; // 3.6 = 360 / 100
        const endAngle = (cumulativePercentage + percentage) * 3.6;

        // SVG 원호를 그리기 위한 계산
        const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180));
        const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180));
        const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180));
        const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180));

        // 큰 원호인지 작은 원호인지 결정 (180도 이상이면 큰 원호)
        const largeArcFlag = percentage > 50 ? 1 : 0;

        // 원호 경로 생성
        const pathData = `
          M 50 50
          L ${startX} ${startY}
          A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}
          Z
        `;

        cumulativePercentage += percentage;

        return (
          <path
            key={index}
            d={pathData}
            fill={item.color.replace("bg-", "").replace("500", "500")}
          />
        );
      })}
      <circle cx="50" cy="50" r="30" fill="white" />
      <text
        x="50"
        y="45"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        fontWeight="bold"
      >
        {Math.floor(total / 10000).toLocaleString()}만 원
      </text>
      <text
        x="50"
        y="60"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="8"
        fill="#6b7280"
      >
        총 지출
      </text>
    </svg>
  );
}

export default Dashboard;
