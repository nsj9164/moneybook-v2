import { StatisticsOnboarding } from "../components/views/StatisticsOnboarding";
import { MonthlyStatistics } from "../components/views/MonthlyStatistics";
import { useFetchMonthlyStatistics } from "../components/hooks/useFetchMonthlyStatistics";
import { useAuth } from "@/contexts/AuthContext";
import { useDateFilter } from "@/hooks/useDateFilter";

const Statistics = () => {
  const { userId } = useAuth();
  const dateFilter = useDateFilter();
  const monthlyData = useFetchMonthlyStatistics({
    targetDate: "2025-06-10",
    userId: userId!,
  });
  // 빈 상태 화면
  const renderEmptyState = () => <StatisticsOnboarding />;

  // 현재 달 데이터가 없는 경우의 화면
  // const renderNoCurrentMonthDataState = () => <StatisticsNoData />;

  const renderMonthlyView = () =>
    monthlyData && <MonthlyStatistics monthlyData={monthlyData} />;

  // const renderYearlyView = () => <YearlyStatistics />;

  // 데이터가 없는 경우 빈 상태 화면 표시
  // if (!hasData) {
  //   return (
  //     <div className="h-full">
  //       {/* 페이지 헤더 */}
  //       <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
  //         <div>
  //           <h1 className="text-2xl font-bold text-gray-900">지출 통계</h1>
  //           <p className="mt-1 text-sm text-gray-500">
  //             지출 데이터를 분석하여 소비 패턴과 재정 상태를 파악하세요.
  //           </p>
  //         </div>
  //       </div>

  //       {/* 빈 상태 화면 */}
  //       {renderEmptyState()}
  //     </div>
  //   );
  // }

  // 현재 달 데이터가 없는 경우
  // if (!hasCurrentMonthData && selectedPeriod === "month") {
  //   return (
  //     <div className="h-full">
  //       {/* 페이지 헤더 */}
  //       <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
  //         <div>
  //           <h1 className="text-2xl font-bold text-gray-900">지출 통계</h1>
  //           <p className="mt-1 text-sm text-gray-500">
  //             {selectedMonth}월 데이터를 추가하면 더 정확한 통계를 확인할 수
  //             있어요.
  //           </p>
  //         </div>
  //         <div className="flex items-center space-x-3">
  //           <div className="relative">
  //             <button
  //               className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
  //               onClick={() => setShowMonthSelector(!showMonthSelector)}
  //             >
  //               <Calendar className="h-4 w-4 text-gray-500 mr-2" />
  //               {selectedYear}년 {selectedMonth}월
  //               <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
  //             </button>

  //             {showMonthSelector && (
  //               <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
  //                 <div className="grid grid-cols-3 gap-2">
  //                   {Array.from({ length: 12 }, (_, i) => i + 1).map(
  //                     (month) => (
  //                       <button
  //                         key={month}
  //                         className={`px-3 py-2 text-sm rounded-md ${
  //                           selectedMonth === month.toString()
  //                             ? "bg-emerald-100 text-emerald-700 font-medium"
  //                             : "hover:bg-gray-100"
  //                         }`}
  //                         onClick={() => {
  //                           setSelectedMonth(month.toString());
  //                           setShowMonthSelector(false);
  //                           // 7월이 아닌 다른 달을 선택하면 데이터가 있는 것으로 처리
  //                           if (month !== 7) {
  //                             setHasCurrentMonthData(true);
  //                           }
  //                         }}
  //                       >
  //                         {month}월
  //                       </button>
  //                     )
  //                   )}
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //           <button
  //             type="button"
  //             className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
  //           >
  //             <Download className="mr-2 -ml-1 h-4 w-4" />
  //             내보내기
  //           </button>
  //           {/* 테스트용 버튼들 */}
  //           <button
  //             onClick={() => setHasData(false)}
  //             className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
  //           >
  //             완전 빈 상태
  //           </button>
  //           <button
  //             onClick={() => setHasCurrentMonthData(true)}
  //             className="text-xs px-3 py-1 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200"
  //           >
  //             데이터 있음
  //           </button>
  //         </div>
  //       </div>

  //       {/* 현재 달 데이터 없음 화면 */}
  //       <div className="p-6 py-8">{renderNoCurrentMonthDataState()}</div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      {/* <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
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
                            // 7월을 선택하면 현재 달 데이터가 없는 것으로 처리
                            if (month === 7) {
                              setHasCurrentMonthData(false);
                            } else {
                              setHasCurrentMonthData(true);
                            }
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
        </div>
      </div> */}

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 py-8 space-y-6">
        {/* 통계 요약 카드 - 전월/전년 대비 추가 */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  {formatCurrency(currentData.totalIncome)}
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
                  {formatCurrency(currentData.totalExpense)}
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
                  {formatCurrency(currentData.totalSavings)}
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
                <h3 className="text-2xl font-bold text-purple-600">
                  {savingsRate.toFixed(1)}%
                </h3>
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
        </div> */}
        {/* 기간별 콘텐츠 */}
        {renderMonthlyView()}
        {/* {selectedPeriod === "month" && renderMonthlyView()} */}
        {/* {selectedPeriod === "year" && renderYearlyView()} */}
      </div>
    </div>
  );
};

export default Statistics;
