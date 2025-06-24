import { formatCurrency } from "@/utils/format";
import { ArrowRight } from "lucide-react";

export const FixedExpenseCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">고정 지출</p>
          <h3 className="text-2xl font-bold text-purple-600 mt-2">
            {formatCurrency(555000)}
          </h3>
        </div>
        <div className="flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {Math.round((555000 / monthlyExpense) * 100)}%
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">총 지출 대비 비율</p>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600">
          <span>월세: {formatCurrency(500000)}</span>
          <span>통신비: {formatCurrency(55000)}</span>
        </div>
        <div className="mt-3">
          <button className="text-xs text-purple-600 font-medium hover:text-purple-700 flex items-center">
            고정 지출 관리
            <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
