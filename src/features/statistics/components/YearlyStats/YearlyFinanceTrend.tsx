export const YearlyFinanceTrend = () => {
  return (
    <CardSection title="연간 재정 추이">
      <div className="h-80">
        <div className="h-full flex items-end justify-between space-x-8">
          {yearlyData.map((item, index) => {
            const maxValue = Math.max(
              ...yearlyData.map((d) => Math.max(d.income, d.expense, d.savings))
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
    </CardSection>
  );
};
