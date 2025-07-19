export const MonthlyExpenseComparison = () => {
  return (
    <CardSection title="월별 지출 비교">
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
          <div>
            <div className="text-sm font-medium text-red-700">가장 높은 달</div>
            <div className="text-lg font-bold text-red-600">
              {yearlyStats.monthlyComparison.highest.month}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-red-600">
              {formatCurrency(yearlyStats.monthlyComparison.highest.amount)}
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
              {formatCurrency(yearlyStats.monthlyComparison.lowest.amount)}
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
    </CardSection>
  );
};
