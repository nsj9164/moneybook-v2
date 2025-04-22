import { ChevronDown, ChevronLeft, ChevronRight, Download } from "lucide-react";

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
  // 금액 포맷팅
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // 최대값 계산 (차트 스케일링용)
  const maxBarValue = Math.max(
    ...monthlyData.map((item) => Math.max(item.income, item.expense))
  );
  const maxWeekdayValue = Math.max(...weekdayData.map((item) => item.expense));
  const maxTimeValue = Math.max(...timeData.map((item) => item.expense));

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">통계</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              className="appearance-none rounded-md border border-gray-300 pl-3 pr-10 py-2 text-sm font-medium text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
              defaultValue="6개월"
            >
              <option>1개월</option>
              <option>3개월</option>
              <option>6개월</option>
              <option>1년</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Download className="mr-2 -ml-1 h-4 w-4" />
            내보내기
          </button>
        </div>
      </div>

      {/* 기간 선택 */}
      <div className="flex items-center justify-center mb-6">
        <button
          type="button"
          className="p-1 rounded-full text-gray-400 hover:text-gray-500"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="mx-4 flex items-center">
          <span className="text-lg font-medium text-gray-900">2023년</span>
          <span className="mx-2">|</span>
          <div className="relative">
            <select
              className="appearance-none rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm font-medium text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
              defaultValue="6"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <button
          type="button"
          className="p-1 rounded-full text-gray-400 hover:text-gray-500"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* 월별 수입/지출 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            월별 수입/지출
          </h2>
          <div className="h-64">
            <div className="flex h-full items-end space-x-2">
              {monthlyData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center space-y-1">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{
                        height: `${(item.income / maxBarValue) * 100}%`,
                        maxHeight: "80%",
                      }}
                    ></div>
                    <div
                      className="w-full bg-red-500 rounded-t"
                      style={{
                        height: `${(item.expense / maxBarValue) * 100}%`,
                        maxHeight: "80%",
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs font-medium text-gray-600">
                    {item.month}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600">수입</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600">지출</span>
            </div>
          </div>
        </div>

        {/* 카테고리별 지출 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            카테고리별 지출
          </h2>
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center">
                    <div
                      className={`h-3 w-3 rounded-full ${category.color} mr-2`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {category.name}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(category.value)} ({category.percentage}%)
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${category.color.replace(
                      "bg-",
                      "bg-"
                    )} h-2.5 rounded-full`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 요일별 및 시간대별 지출 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            요일별 지출
          </h2>
          <div className="h-64">
            <div className="flex h-full items-end space-x-6">
              {weekdayData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-emerald-500 rounded-t"
                    style={{
                      height: `${(item.expense / maxWeekdayValue) * 100}%`,
                      maxHeight: "90%",
                    }}
                  ></div>
                  <div className="mt-2 text-sm font-medium text-gray-600">
                    {item.day}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(item.expense)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            시간대별 지출
          </h2>
          <div className="h-64">
            <div className="flex h-full items-end space-x-6">
              {timeData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-purple-500 rounded-t"
                    style={{
                      height: `${(item.expense / maxTimeValue) * 100}%`,
                      maxHeight: "90%",
                    }}
                  ></div>
                  <div className="mt-2 text-sm font-medium text-gray-600">
                    {item.time}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(item.expense)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 월간 요약 */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">월간 요약</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">총 수입</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {formatCurrency(3200000)}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">총 지출</div>
            <div className="text-2xl font-bold text-red-600 mt-1">
              {formatCurrency(2750000)}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">잔액</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {formatCurrency(3200000 - 2750000)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
