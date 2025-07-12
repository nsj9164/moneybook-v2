export const MonthlyIncomeStats = () => {
  return (
    <div className="h-80">
      <div className="h-full flex items-end justify-between space-x-4">
        {monthlyData.slice(0, 6).map((item, index) => {
          const maxValue = Math.max(...monthlyData.map((d) => d.income));
          const height = (item.income / maxValue) * 100;
          const isCurrentMonth = item.month === `${selectedMonth}월`;

          return (
            <div key={item.month} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height * 0.8}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-full rounded-t-lg ${
                  isCurrentMonth ? "bg-emerald-500" : "bg-emerald-300"
                }`}
                title={`수입: ${formatCurrency(item.income)}`}
              />
              <div className="text-xs font-medium text-gray-600 mt-2">
                {item.month}
              </div>
              <div className="text-xs text-gray-500">
                {formatCurrency(item.income)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
