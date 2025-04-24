import { Download, Upload } from "lucide-react";

// 샘플 데이터
const monthlyExpense = 1250000;
const monthlyGoal = 1500000;

const categoryData = [
  { name: "식비", value: 450000, color: "bg-rose-500" },
  { name: "교통비", value: 120000, color: "bg-blue-500" },
  { name: "주거비", value: 350000, color: "bg-amber-500" },
  { name: "쇼핑", value: 180000, color: "bg-emerald-500" },
  { name: "여가", value: 150000, color: "bg-purple-500" },
];

const recentTransactions = [
  { date: "2023-06-15", description: "스타벅스", amount: 5500 },
  { date: "2023-06-14", description: "지하철 충전", amount: 30000 },
  { date: "2023-06-13", description: "온라인 쇼핑", amount: 45000 },
  { date: "2023-06-12", description: "식료품", amount: 32000 },
  { date: "2023-06-10", description: "영화 티켓", amount: 15000 },
];

const Dashboard = () => {
  // 금액 포맷팅
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* 이번 달 총 지출 */}
        <div className="rounded-lg border bg-white shadow-sm h-full">
          <div className="p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              이번 달 총 지출
            </h2>
            <p className="text-sm text-gray-500">2023년 6월</p>
            <div className="mt-4 text-3xl font-bold text-emerald-600">
              {formatCurrency(monthlyExpense)}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              목표 지출액: {formatCurrency(monthlyGoal)}
            </p>
          </div>
        </div>

        {/* 목표 대비 퍼센트 */}
        <div className="rounded-lg border bg-white shadow-sm h-full">
          <div className="p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              목표 대비 지출
            </h2>
            <p className="text-sm text-gray-500">
              목표: {formatCurrency(monthlyGoal)}
            </p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {Math.round((monthlyExpense / monthlyGoal) * 100)}%
                </span>
                <span className="text-sm text-gray-500">100%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-200">
                <div
                  className={`h-2.5 rounded-full ${
                    monthlyExpense > monthlyGoal
                      ? "bg-red-500"
                      : "bg-emerald-600"
                  }`}
                  style={{
                    width: `${Math.min(
                      (monthlyExpense / monthlyGoal) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-500">
                {monthlyExpense < monthlyGoal
                  ? `목표까지 ${formatCurrency(
                      monthlyGoal - monthlyExpense
                    )} 남았습니다.`
                  : "목표를 초과했습니다."}
              </p>
            </div>
          </div>
        </div>

        {/* 엑셀 업로드 */}
        <div className="rounded-lg border bg-white shadow-sm h-full">
          <div className="p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              데이터 가져오기
            </h2>
            <p className="text-sm text-gray-500">엑셀 파일을 업로드하세요</p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 p-6">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-center"
                >
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    파일을 선택하세요
                  </p>
                  <p className="text-xs text-gray-500">
                    Excel 파일만 지원됩니다
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                  />
                </label>
              </div>
              <button
                type="button"
                className="w-full inline-flex justify-center items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Upload className="mr-2 -ml-1 h-4 w-4" />
                업로드
              </button>
            </div>
          </div>
        </div>

        {/* 카테고리별 지출 도넛 차트 */}
        <div className="sm:col-span-2 rounded-lg border bg-white shadow-sm h-full">
          <div className="p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              카테고리별 지출
            </h2>
            <p className="text-sm text-gray-500">이번 달 지출 분석</p>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="relative h-56 w-56 flex-shrink-0">
                <DonutChart data={categoryData} />
              </div>
              <div className="grid gap-3 w-full max-w-xs mt-4 md:mt-0">
                {categoryData.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50"
                  >
                    <div className={`h-4 w-4 rounded-full ${category.color}`} />
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
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 rounded-lg border bg-white shadow-sm h-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b p-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                최근 지출 내역
              </h2>
              <p className="text-sm text-gray-500">
                최근 거래 내역을 확인하세요
              </p>
            </div>
            <button
              type="button"
              className="mt-3 sm:mt-0 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
            >
              <Download className="mr-2 -ml-1 h-4 w-4" />
              내보내기
            </button>
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
                {recentTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
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
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
            >
              모든 거래 보기
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
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        fontWeight="bold"
      >
        {Math.floor(total / 10000).toLocaleString()}만 원
      </text>
    </svg>
  );
}

export default Dashboard;
