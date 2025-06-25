import { formatCurrency } from "@/utils/format";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export const ExpenseCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">이번 달 총 지출</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(monthlyExpense)}
          </h3>
        </div>
        <div
          className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            isIncrease
              ? "bg-red-100 text-red-800"
              : "bg-emerald-100 text-emerald-800"
          }`}
        >
          {isIncrease ? (
            <ArrowUpRight className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 mr-1" />
          )}
          {Math.abs(monthlyChangeRate).toFixed(1)}%
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        전월 대비 {isIncrease ? "증가" : "감소"}
      </p>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-gray-500">목표 대비</span>
          <span className="text-xs font-medium text-gray-700">
            {Math.round(budgetAchievementRate)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              budgetAchievementRate > 100 ? "bg-red-500" : "bg-emerald-500"
            }`}
            style={{ width: `${Math.min(budgetAchievementRate, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1.5">
          목표: {formatCurrency(monthlyGoal)}
        </p>
      </div>
    </div>
  );
};
