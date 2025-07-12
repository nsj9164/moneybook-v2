import { formatCurrency } from "@/utils/format";

export const YearlyStatistics = () => {
  return (
    <div className="space-y-6">
      {/* 월별 수입/지출/저축 추이 (기존 월간에서 이동) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              월별 재정 추이
            </h2>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
              <span>상세 보기</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="h-80">
            <div className="h-full flex items-end justify-between space-x-2">
              {monthlyData.map((item, index) => {
                const maxValue = Math.max(
                  ...monthlyData.map((d) => Math.max(d.income, d.expense))
                );
                const incomeHeight = (item.income / maxValue) * 100;
                const expenseHeight = (item.expense / maxValue) * 100;
                const savingsHeight =
                  ((item.income - item.expense) / maxValue) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full flex justify-center space-x-1 mb-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${incomeHeight * 0.7}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="w-2 rounded-t-sm bg-emerald-500"
                        title={`수입: ${formatCurrency(item.income)}`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${expenseHeight * 0.7}%` }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.05 + 0.1,
                        }}
                        className="w-2 rounded-t-sm bg-red-500"
                        title={`지출: ${formatCurrency(item.expense)}`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${savingsHeight * 0.7}%` }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.05 + 0.2,
                        }}
                        className="w-2 rounded-t-sm bg-blue-500"
                        title={`저축: ${formatCurrency(
                          item.income - item.expense
                        )}`}
                      />
                    </div>
                    <div className="text-xs font-medium text-gray-600 mt-2">
                      {item.month}
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
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">저축</span>
            </div>
          </div>
        </div>
      </div>

      {/* 연간 재정 추이 */}
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
                  ...yearlyData.map((d) =>
                    Math.max(d.income, d.expense, d.savings)
                  )
                );
                const incomeHeight = (item.income / maxValue) * 100;
                const expenseHeight = (item.expense / maxValue) * 100;
                const savingsHeight = (item.savings / maxValue) * 100;
                const isCurrentYear = item.year === selectedYear;

                return (
                  <div
                    key={item.year}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full flex justify-center space-x-2 mb-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${incomeHeight * 0.7}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className={`w-6 rounded-t-sm ${
                          isCurrentYear ? "bg-emerald-500" : "bg-emerald-300"
                        }`}
                        title={`수입: ${formatCurrency(item.income)}`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${expenseHeight * 0.7}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.1 }}
                        className={`w-6 rounded-t-sm ${
                          isCurrentYear ? "bg-red-500" : "bg-red-300"
                        }`}
                        title={`지출: ${formatCurrency(item.expense)}`}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${savingsHeight * 0.7}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                        className={`w-6 rounded-t-sm ${
                          isCurrentYear ? "bg-blue-500" : "bg-blue-300"
                        }`}
                        title={`저축: ${formatCurrency(item.savings)}`}
                      />
                    </div>
                    <div className="text-lg font-medium text-gray-900 mt-2">
                      {item.year}
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
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">저축</span>
            </div>
          </div>
        </div>
      </div>

      {/* 예산 달성률 & 월별 비교 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">예산 달성률</h2>
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {yearlyStats.budgetAchievement}%
              </div>
              <div className="text-sm text-gray-600">연간 예산 목표 달성률</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${yearlyStats.budgetAchievement}%` }}
                transition={{ duration: 1 }}
                className="h-4 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              />
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600">
                {yearlyStats.budgetAchievement >= 100
                  ? "🎉 목표 달성!"
                  : "💪 목표까지 조금 더!"}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              월별 지출 비교
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-red-700">
                    가장 높은 달
                  </div>
                  <div className="text-lg font-bold text-red-600">
                    {yearlyStats.monthlyComparison.highest.month}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">
                    {formatCurrency(
                      yearlyStats.monthlyComparison.highest.amount
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-emerald-700">
                    가장 낮은 달
                  </div>
                  <div className="text-lg font-bold text-emerald-600">
                    {yearlyStats.monthlyComparison.lowest.month}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-600">
                    {formatCurrency(
                      yearlyStats.monthlyComparison.lowest.amount
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600 text-center">
                  차이:{" "}
                  {formatCurrency(
                    yearlyStats.monthlyComparison.highest.amount -
                      yearlyStats.monthlyComparison.lowest.amount
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 소비 TOP 3 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              소비가 높은 카테고리 TOP 3
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {yearlyStats.topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(category.amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              소비가 잦은 항목 TOP 3
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {yearlyStats.frequentItems.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.count}회 이용
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(item.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 결제수단 & 고정비 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              많이 사용한 결제수단 TOP 3
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {yearlyStats.topPaymentMethods.map((method, index) => (
                <div key={method.name} className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {method.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(method.amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${method.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">연간 고정비</h2>
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {formatCurrency(yearlyStats.yearlyFixedExpenses)}
              </div>
              <div className="text-sm text-gray-600">연간 고정비 총액</div>
            </div>

            <div className="space-y-3">
              {fixedExpenses.map((expense) => (
                <div
                  key={expense.name}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-sm text-gray-700">{expense.name}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(expense.amount * 12)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-amber-50 rounded-lg">
              <div className="text-sm text-amber-800 text-center">
                💡 고정비는 전체 지출의{" "}
                {(
                  (yearlyStats.yearlyFixedExpenses / currentData.totalExpense) *
                  100
                ).toFixed(1)}
                %를 차지해요
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
