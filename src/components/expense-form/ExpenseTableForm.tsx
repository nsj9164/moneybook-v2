import { formatCurrency } from "@/utils/format";
import { Trash2 } from "lucide-react";
import { expensesFormProps } from "./types";

export const ExpenseTableForm = ({
  newExpenses,
  setNewExpenses,
  categories,
  payMethods,
  handleUpdExpense,
  handleDelExpense,
  getSplitAmount,
}: expensesFormProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              날짜
            </th>
            <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              카테고리
            </th>
            <th className="w-[20%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              항목
            </th>
            <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              결제금액
            </th>
            <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              실제지출
            </th>
            <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              결제수단
            </th>
            <th className="w-[15%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              메모
            </th>
            <th className="w-[5%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              삭제
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {newExpenses?.length > 0 &&
            newExpenses.map((expense) => (
              <>
                <tr key={expense.id}>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    <input
                      type="date"
                      value={expense.date}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    <select
                      value={expense.categoryId}
                      onChange={(e) =>
                        handleUpdExpense(
                          e.target.value,
                          expense.id,
                          "categoryId"
                        )
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    >
                      <option value="">미분류</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    <input
                      type="text"
                      value={expense.itemName}
                      onChange={(e) =>
                        handleUpdExpense(e.target.value, expense.id, "itemName")
                      }
                      placeholder="지출 항목을 입력하세요"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₩</span>
                      </div>
                      <input
                        type="text"
                        value={formatCurrency(Number(expense.amount))}
                        onChange={(e) =>
                          handleUpdExpense(e.target.value, expense.id, "amount")
                        }
                        className="w-full pl-7 pr-3 rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 align-top">
                    <div className="flex flex-col gap-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₩</span>
                        </div>
                        <input
                          type="text"
                          value={formatCurrency(Number(expense.actualAmount))}
                          disabled={!expense.isDifferentAmount}
                          onChange={(e) =>
                            handleUpdExpense(
                              e.target.value,
                              expense.id,
                              "actualAmount"
                            )
                          }
                          className={`w-full pl-7 pr-3 rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm ${
                            !expense.isDifferentAmount ? "bg-gray-100" : ""
                          }`}
                        />
                      </div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={expense.isDifferentAmount}
                          onChange={() =>
                            handleUpdExpense(
                              !expense.isDifferentAmount,
                              expense.id,
                              "isDifferentAmount"
                            )
                          }
                          id={`checkbox-${expense.id}`}
                          className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-xs text-gray-500">
                          실제 지출 다름
                        </span>
                      </label>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    <select
                      value={expense.paymentMethodId}
                      onChange={(e) =>
                        handleUpdExpense(
                          e.target.value,
                          expense.id,
                          "categoryId"
                        )
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    >
                      <option value="">미분류</option>
                      {payMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    <input
                      type="text"
                      value={expense.note}
                      onChange={(e) =>
                        handleUpdExpense(e.target.value, expense.id, "note")
                      }
                      placeholder="메모"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-right">
                    <button
                      onClick={() => handleDelExpense(expense.id)}
                      type="button"
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">삭제</span>
                    </button>
                  </td>
                </tr>
                {expense.isDifferentAmount && (
                  <tr className="bg-emerald-50 border-t border-emerald-100">
                    <td colSpan={8} className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center">
                          <span className="text-emerald-700 font-medium mr-2">
                            인원 수:
                          </span>
                          <input
                            type="number"
                            min="1"
                            value={expense.numberOfPeople}
                            onChange={(e) =>
                              getSplitAmount(Number(e.target.value), expense.id)
                            }
                            className="w-16 rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                          />
                          <span className="text-emerald-700 ml-1">명</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-emerald-700 font-medium mr-2">
                            1인당 금액:
                          </span>
                          <span className="font-medium text-emerald-600">
                            {formatCurrency(Number(expense.actualAmount))}
                          </span>
                        </div>
                        <div className="text-xs text-emerald-600 ml-auto">
                          * 인원 수를 변경하면 1인당 금액이 자동으로 계산됩니다.
                          필요시 직접 수정할 수 있습니다.
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
};
