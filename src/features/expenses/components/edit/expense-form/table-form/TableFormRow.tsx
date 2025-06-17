import { CategoryEntity, IExpense, PayMethodEntity } from "@/types";
import { formatCurrency, parseCurrency } from "@/utils/format";
import { Trash2 } from "lucide-react";
import {
  DelTableExpenseHandler,
  UpdActualAmountHandler,
  UpdTableExpenseHandler,
} from "../types/handlers";

interface ExpenseFormTableRow {
  expense: IExpense;
  categories: CategoryEntity[];
  payMethods: PayMethodEntity[];
  handleUpdExpense: UpdTableExpenseHandler;
  handleDelExpense: DelTableExpenseHandler;
  updateActualAmount: UpdActualAmountHandler;
}

export const TableFormRow = ({
  expense,
  categories,
  payMethods,
  handleUpdExpense,
  handleDelExpense,
  updateActualAmount,
}: ExpenseFormTableRow) => {
  return (
    <tr>
      <td className="px-4 py-4 text-sm text-gray-700">
        <input
          type="date"
          value={expense.date}
          onChange={(e) => handleUpdExpense(e.target.value, expense.id, "date")}
          className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
      </td>
      <td className="px-4 py-4 text-sm text-gray-700">
        <select
          value={expense.categoryId}
          onChange={(e) =>
            handleUpdExpense(e.target.value, expense.id, "categoryId")
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
            value={formatCurrency(expense.amount)}
            onChange={(e) =>
              handleUpdExpense(
                parseCurrency(e.target.value),
                expense.id,
                "amount"
              )
            }
            onBlur={(e) =>
              updateActualAmount(
                e.target.value,
                expense.id,
                expense.numberOfPeople ?? 0
              )
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
              value={formatCurrency(expense.actualAmount)}
              disabled={!expense.isDifferentAmount}
              onChange={(e) =>
                handleUpdExpense(
                  parseCurrency(e.target.value),
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
            <span className="ml-2 text-xs text-gray-500">실제 지출 다름</span>
          </label>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-700">
        <select
          value={expense.paymentMethodId}
          onChange={(e) =>
            handleUpdExpense(e.target.value, expense.id, "paymentMethodId")
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
          onChange={(e) => handleUpdExpense(e.target.value, expense.id, "note")}
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
  );
};
