export const YearlyStatistics = () => {
  return (
    <div className="space-y-6">
      {/* 연간 추이 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            연간 재정 추이
          </h2>
        </div>
        <div className="p-6">
          <div className="h-80">
            <div className="h-full flex items-end justify-between space-x-8">
              {yearlyData.map((item, index) => {
                const maxValue = Math.max(
                  ...yearlyData.map((d) => Math.max(d.income, d.expense))
                );
                const incomeHeight = (item.income / maxValue) * 100;
                const expenseHeight = (item.expense / maxValue) * 100;
                const isCurrentYear = item.year === selectedYear;

                return (
                  <div
                    key={item.year}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full flex justify-center space-x-3 mb-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${incomeHeight * 0.7}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className={`w-8 rounded-t-sm ${
                          isCurrentYear ? "bg-emerald-500" : "bg-emerald-300"
                        }`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${expenseHeight * 0.7}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.1 }}
                        className={`w-8 rounded-t-sm ${
                          isCurrentYear ? "bg-red-500" : "bg-red-300"
                        }`}
                      />
                    </div>
                    <div className="text-lg font-medium text-gray-900 mt-2">
                      {item.year}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      저축: {formatCurrency(item.savings)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 저축률 추이 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">저축률 추이</h2>
        </div>
        <div className="p-6">
          <div className="h-48">
            <div className="h-full flex items-end justify-between space-x-4">
              {yearlyData.map((item, index) => {
                const savingsRate = (item.savings / item.income) * 100;
                const heightPercentage = (savingsRate / 20) * 100; // 20%를 최대값으로 가정

                return (
                  <div
                    key={item.year}
                    className="flex-1 flex flex-col items-center"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: `${Math.min(heightPercentage, 100)}%`,
                      }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                    />
                    <div className="text-sm font-medium text-gray-900 mt-2">
                      {item.year}
                    </div>
                    <div className="text-xs text-gray-600">
                      {savingsRate.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              💡 인사이트
            </h3>
            <p className="text-sm text-blue-800">
              2023년 저축률이 크게 개선되었습니다. 지출 관리가 효과적으로
              이루어지고 있어요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
