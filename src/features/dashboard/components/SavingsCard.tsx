export const SavingsCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">이번 달 저축</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-2">
            {formatCurrency(savingsAmount)}
          </h3>
        </div>
        <div className="flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
          {savingsRate.toFixed(1)}%
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">수입 대비 저축률</p>

      <div className="mt-4 flex items-center">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-gray-500">
              목표 달성률
            </span>
            <span className="text-xs font-medium text-gray-700">75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-emerald-500"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
