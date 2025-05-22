import { ExpenseColumns } from "@/pages/Expenses/types/filters";
import { IExpense, UUID } from "@/types/expense-types";
import { formatCurrency } from "@/utils/format";
import { Pencil } from "lucide-react";

interface RowProps {
  expense: IExpense;
  checked: boolean;
  columns: ExpenseColumns[];
  editExpense: (id: UUID) => void;
  toggleItemSelection: (id: UUID) => void;
}
export const Row = ({
  expense,
  checked,
  columns,
  editExpense,
  toggleItemSelection,
}: RowProps) => {
  return (
    <tr
      key={expense.id}
      className={`hover:bg-gray-50 ${
        expense.recurringExpenseId ? "bg-blue-50" : ""
      } ${expense.isDifferentAmount ? "bg-amber-50" : ""}`}
    >
      <td className="w-12 px-6 py-4 sm:w-16 sm:px-8">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          checked={checked}
          onChange={() => toggleItemSelection(expense.id)}
        />
      </td>
      {columns.find((col) => col.id === "date")?.visible && (
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
          {expense.date}
        </td>
      )}
      {columns.find((col) => col.id === "category")?.visible && (
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${
                          expense.categoryId === 0
                            ? "bg-rose-100 text-rose-800"
                            : expense.categoryId === 1
                            ? "bg-blue-100 text-blue-800"
                            : expense.categoryId === 2
                            ? "bg-emerald-100 text-emerald-800"
                            : expense.categoryId === 3
                            ? "bg-purple-100 text-purple-800"
                            : "bg-amber-100 text-amber-800"
                        }
                        `}
          >
            {expense.categories?.name}
          </span>
        </td>
      )}
      {columns.find((col) => col.id === "itemName")?.visible && (
        <td className="px-6 py-4 text-sm text-gray-900">{expense.itemName}</td>
      )}
      {columns.find((col) => col.id === "amount")?.visible && (
        <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-medium">
          {formatCurrency(expense.amount)}
        </td>
      )}
      {columns.find((col) => col.id === "actualAmount")?.visible && (
        <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-medium">
          {formatCurrency(expense.actualAmount)}
        </td>
      )}
      {columns.find((col) => col.id === "paymentMethod")?.visible && (
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
          {expense.paymentMethodId}
        </td>
      )}
      {columns.find((col) => col.id === "note")?.visible && (
        <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">
          {expense.note}
        </td>
      )}
      <td className="whitespace-nowrap px-6 py-4 text-sm text-right">
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => editExpense(expense.id)}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Pencil className="mr-1 h-3 w-3" />
            수정
          </button>
        </div>
      </td>
    </tr>
  );
};
