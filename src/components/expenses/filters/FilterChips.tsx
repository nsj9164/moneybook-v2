import { IExpense } from "@/types/expense-types";
import { formatCurrency } from "@/utils/format";

export const FilterChips = ({
  filteredExpenses,
}: {
  filteredExpenses: IExpense[];
}) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <p className="text-sm text-gray-500">필터링된 지출</p>
          <div className="flex items-center justify-between mt-1">
            <h3 className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                filteredExpenses.reduce(
                  (sum, expense) => sum + expense.actualAmount,
                  0
                )
              )}
            </h3>
            <span className="text-sm font-medium text-gray-500">
              {filteredExpenses.length}건
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <p className="text-sm text-gray-500">평균 지출</p>
          <div className="flex items-center justify-between mt-1">
            <h3 className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                filteredExpenses.length > 0
                  ? filteredExpenses.reduce(
                      (sum, expense) => sum + expense.actualAmount,
                      0
                    ) / filteredExpenses.length
                  : 0
              )}
            </h3>
            <span className="text-sm font-medium text-gray-500">건당</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <p className="text-sm text-gray-500">최대 지출</p>
          <div className="flex items-center justify-between mt-1">
            <h3 className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                filteredExpenses.length > 0
                  ? Math.max(
                      ...filteredExpenses.map((expense) => expense.actualAmount)
                    )
                  : 0
              )}
            </h3>
            <span className="text-sm font-medium text-gray-500">
              {filteredExpenses.length > 0
                ? filteredExpenses.find(
                    (e) =>
                      e.actualAmount ===
                      Math.max(
                        ...filteredExpenses.map((exp) => exp.actualAmount)
                      )
                  )?.categoryId
                : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
