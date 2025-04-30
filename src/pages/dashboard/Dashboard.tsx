import { useState } from "react";
import {
  BarChart3,
  Download,
  Upload,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Calendar,
  ChevronDown,
} from "lucide-react";

// 샘플 데이터
const monthlyExpense = 1250000;
const monthlyGoal = 1500000;
const lastMonthExpense = 1350000;

const categoryData = [
  { name: "식비", value: 450000, color: "bg-rose-500", percentage: 36 },
  { name: "교통비", value: 120000, color: "bg-blue-500", percentage: 9.6 },
  { name: "주거비", value: 350000, color: "bg-amber-500", percentage: 28 },
  { name: "쇼핑", value: 180000, color: "bg-emerald-500", percentage: 14.4 },
  { name: "여가", value: 150000, color: "bg-purple-500", percentage: 12 },
];

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

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 금액 포맷팅
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(amount);
  };

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

  return (
    <div className="bg-white w-full h-full">
      {/* 필터 영역 */}
      <div className="flex items-center justify-end p-4 border-b">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500 mr-auto">2023년 6월</p>
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-1.5">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <select
              className="appearance-none bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none focus:ring-0"
              defaultValue="6"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
          </div>
        </div>
      </div>

      {/* 요약 카드 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* 이번 달 총 지출 */}
        <div className="bg-white rounded-lg border shadow-sm p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                이번 달 총 지출
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
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
          <p className="text-sm text-gray-500 mt-2">
            전월 대비 {isIncrease ? "증가" : "감소"}
          </p>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-500">
                목표 대비
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round((monthlyExpense / monthlyGoal) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  monthlyExpense > monthlyGoal ? "bg-red-500" : "bg-emerald-500"
                }`}
                style={{
                  width: `${Math.min(
                    (monthlyExpense / monthlyGoal) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              목표 지출액: {formatCurrency(monthlyGoal)}
            </p>
          </div>
        </div>

        {/* 주간 지출 트렌드 */}
        <div className="bg-white rounded-lg border shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500">주간 지출 트렌드</p>

          <div className="h-40 mt-4 flex items-end space-x-2">
            {weeklyData.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-emerald-500 rounded-t-sm hover:bg-emerald-600 transition-colors"
                  style={{
                    height: `${(item.expense / maxWeeklyExpense) * 100}%`,
                  }}
                ></div>
                <div className="mt-2 text-xs font-medium text-gray-600">
                  {item.day}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              이번 주 총 지출:{" "}
              {formatCurrency(
                weeklyData.reduce((sum, day) => sum + day.expense, 0)
              )}
            </p>
            <button className="text-xs text-emerald-600 font-medium hover:text-emerald-700">
              자세히 보기
            </button>
          </div>
        </div>

        {/* 데이터 가져오기 */}
        <div className="bg-white rounded-lg border shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500">데이터 가져오기</p>
          <p className="text-xs text-gray-500 mt-1">엑셀 파일을 업로드하세요</p>

          <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 hover:border-emerald-300 transition-colors">
            <label htmlFor="file-upload" className="cursor-pointer text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm font-medium text-gray-700">
                {selectedFile ? selectedFile.name : "파일을 선택하세요"}
              </p>
              <p className="text-xs text-gray-500">Excel 파일만 지원됩니다</p>
              <input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            type="button"
            disabled={!selectedFile}
            className="mt-4 w-full inline-flex justify-center items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Upload className="mr-2 -ml-1 h-4 w-4" />
            업로드
          </button>
        </div>
      </div>

      {/* 카테고리별 지출 및 최근 거래 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4">
        {/* 카테고리별 지출 도넛 차트 */}
        <div className="lg:col-span-1 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-900">
                카테고리별 지출
              </h2>
              <button className="text-xs text-emerald-600 font-medium hover:text-emerald-700">
                모두 보기
              </button>
            </div>
            <p className="text-sm text-gray-500">이번 달 지출 분석</p>

            <div className="mt-6 flex flex-col items-center">
              <div className="relative h-48 w-48">
                <DonutChart data={categoryData} />
              </div>
              <div className="grid gap-3 w-full mt-4">
                {categoryData.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50"
                  >
                    <div className={`h-3 w-3 rounded-full ${category.color}`} />
                    <div className="flex-1 text-sm font-medium text-gray-700">
                      {category.name}
                    </div>
                    <div className="font-medium text-gray-900">
                      {formatCurrency(category.value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 최근 지출 내역 */}
        <div className="lg:col-span-2 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b p-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                최근 지출 내역
              </h2>
              <p className="text-sm text-gray-500">
                최근 거래 내역을 확인하세요
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-3 sm:mt-0">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Filter className="mr-2 -ml-1 h-4 w-4" />
                필터
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Download className="mr-2 -ml-1 h-4 w-4" />
                내보내기
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    날짜
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    카테고리
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    항목
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    금액
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${
                          transaction.category === "식비"
                            ? "bg-rose-100 text-rose-800"
                            : transaction.category === "교통비"
                            ? "bg-blue-100 text-blue-800"
                            : transaction.category === "쇼핑"
                            ? "bg-emerald-100 text-emerald-800"
                            : transaction.category === "여가"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t px-6 py-4 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              모든 거래 보기
            </button>
          </div>
        </div>
      </div>

      {/* 지출 분석 및 예산 요약 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* 지출 분석 */}
        <div className="bg-white rounded-lg border shadow-sm p-5 hover:shadow-md transition-shadow">
          <h2 className="text-base font-semibold text-gray-900">지출 분석</h2>
          <p className="text-sm text-gray-500">이번 달 지출 패턴</p>

          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  평일 vs 주말
                </span>
                <span className="text-sm text-gray-500">65% : 35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  오전 vs 오후
                </span>
                <span className="text-sm text-gray-500">30% : 70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  현금 vs 카드
                </span>
                <span className="text-sm text-gray-500">20% : 80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-emerald-500"
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700">
              <span className="font-medium">지출 인사이트:</span> 주로 주말과
              오후 시간대에 지출이 집중되어 있습니다. 식비와 쇼핑 카테고리에서
              지출이 가장 많습니다.
            </p>
          </div>
        </div>

        {/* 예산 요약 */}
        <div className="bg-white rounded-lg border shadow-sm p-5 hover:shadow-md transition-shadow">
          <h2 className="text-base font-semibold text-gray-900">예산 요약</h2>
          <p className="text-sm text-gray-500">카테고리별 예산 진행 상황</p>

          <div className="mt-4 space-y-4">
            {categoryData.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div
                      className={`h-3 w-3 rounded-full ${category.color} mr-2`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {category.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color.replace(
                      "bg-",
                      "bg-"
                    )}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-emerald-500 bg-white px-4 py-2 text-sm font-medium text-emerald-600 shadow-sm hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <BarChart3 className="mr-2 -ml-1 h-4 w-4" />
              예산 관리
            </button>
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
