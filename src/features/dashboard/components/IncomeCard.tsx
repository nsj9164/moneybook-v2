import { formatCurrency } from "@/utils/format";

export const IncomeCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">이번 달 총 수입</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-2">
            {formatCurrency(monthlyIncome)}
          </h3>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">급여, 부수입 포함</p>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-gray-500">지출 비율</span>
          <span className="text-xs font-medium text-gray-700">
            {Math.round((monthlyExpense / monthlyIncome) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-blue-500"
            style={{
              width: `${Math.min(
                (monthlyExpense / monthlyIncome) * 100,
                100
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
