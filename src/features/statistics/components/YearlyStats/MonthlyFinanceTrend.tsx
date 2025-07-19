import { CardSection } from "@/components/common/layout/CardSection";
import { DetailButton } from "@/components/common/layout/DetailButton";

export const MonthlyFinanceTrend = () => {
  return (
    <CardSection title="월별 재정 추이" action={<DetailButton />}>
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
    </CardSection>
  );
};
