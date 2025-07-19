export const YearlyFixedExpenses = () => {
  return (
    <CardSection title="연간 고정비">
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
    </CardSection>
  );
};
