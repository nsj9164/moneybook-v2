export const QuarterlyStatistics = () => {
  return (
    <div className="space-y-6">
      {/* 분기별 성과 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">분기별 성과</h2>
        </div>
        <div className="p-6">
          <div className="h-80">
            <div className="h-full flex items-end justify-between space-x-6">
              {quarterlyData.map((item, index) => {
                const maxValue = Math.max(
                  ...quarterlyData.map((d) =>
                    Math.max(d.income, d.expense, d.target)
                  )
                );
                const incomeHeight = (item.income / maxValue) * 100;
                const expenseHeight = (item.expense / maxValue) * 100;
                const targetHeight = (item.target / maxValue) * 100;
                const currentQuarter = Math.ceil(
                  Number.parseInt(selectedMonth) / 3
                );
                const isCurrentQuarter = index + 1 === currentQuarter;

                return (
                  <div
                    key={item.quarter}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full flex justify-center space-x-2 mb-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${incomeHeight * 0.7}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`w-6 rounded-t-sm ${
                          isCurrentQuarter ? "bg-emerald-500" : "bg-emerald-300"
                        }`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${expenseHeight * 0.7}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                        className={`w-6 rounded-t-sm ${
                          isCurrentQuarter ? "bg-red-500" : "bg-red-300"
                        }`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${targetHeight * 0.7}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className="w-2 rounded-t-sm bg-amber-400 border-2 border-amber-600"
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-600 mt-2">
                      {item.quarter}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      목표 {item.expense <= item.target ? "달성" : "미달성"}
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
            <div className="flex items-center">
              <div className="w-2 h-4 bg-amber-400 border border-amber-600 mr-2"></div>
              <span className="text-sm text-gray-600">목표</span>
            </div>
          </div>
        </div>
      </div>

      {/* 월별 비교 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            분기 내 월별 비교
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {monthlyData.slice(3, 6).map((month, index) => (
              <div key={month.month} className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {month.month}
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    지출:{" "}
                    <span className="font-medium text-red-600">
                      {formatCurrency(month.expense)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    저축:{" "}
                    <span className="font-medium text-emerald-600">
                      {formatCurrency(month.income - month.expense)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    저축률:{" "}
                    {(
                      ((month.income - month.expense) / month.income) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
