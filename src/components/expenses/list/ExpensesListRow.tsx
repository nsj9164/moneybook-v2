import { IExpense } from "@/types/expense-types";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";

export const ExpensesListRow = ({ expense }: { expense: IExpense }) => {
  return (
    <tr key={expense.id} className="hover:bg-gray-50">
      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {format(expense.date, "yyyy-MM-dd")}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {expense.categories?.name}
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">{expense.itemName}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {expense.paymentMethods?.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium">
        {formatCurrency(expense.amount)}
      </td>
    </tr>
  );
};
