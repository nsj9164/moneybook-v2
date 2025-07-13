export const WeeklyExpenses = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">주별 지출 요약</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {weeklyData.map((week, index) => {
            const maxWeeklyExpense = Math.max(
              ...weeklyData.map((w) => w.expense)
            );
            const widthPercentage = (week.expense / maxWeeklyExpense) * 100;
            const avgDaily = week.expense / week.days;

            return (
              <div key={week.week} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {week.week}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(week.expense)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPercentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  일평균: {formatCurrency(avgDaily)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
