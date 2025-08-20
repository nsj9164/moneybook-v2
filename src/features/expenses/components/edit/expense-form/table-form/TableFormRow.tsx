import { CategorySaved, ExpenseSaved, PayMethodSaved } from "@/types";
import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface ExpenseFormTableRow {
  index: number;
  expense: ExpenseSaved;
  categories: CategorySaved[];
  payMethods: PayMethodSaved[];
}

export const TableFormRow = ({
  index,
  expense,
  categories,
  payMethods,
}: ExpenseFormTableRow) => {
  const { register } = useFormContext();
  return (
    <tr>
      <td className="px-4 py-4 text-sm text-gray-700">
        <input
          {...register(`items.${index}.date`, { required: true })}
          type="date"
          value={expense.date}
          className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
      </td>
      <td className="px-4 py-4 text-sm text-gray-700">
        <select
          {...register(`items.${index}.categoryId`, { required: true })}
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
          {...register(`items.${index}.itemName`, { required: true })}
          type="text"
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
            {...register(`items.${index}.amount`, {
              required: true,
              valueAsNumber: true,
            })}
            type="text"
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
              {...register(`items.${index}.actualAmount`, {
                required: true,
                valueAsNumber: true,
              })}
              type="text"
              disabled={!expense.isDifferentAmount}
              className={`w-full pl-7 pr-3 rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm ${
                !expense.isDifferentAmount ? "bg-gray-100" : ""
              }`}
            />
          </div>
          <label className="inline-flex items-center">
            <input
              {...register(`items.${index}.isDifferentAmount`, {
                required: true,
              })}
              type="checkbox"
              checked={expense.isDifferentAmount}
              className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <span className="ml-2 text-xs text-gray-500">실제 지출 다름</span>
          </label>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-700">
        <select
          {...register(`items.${index}.paymentMethodId`, {
            required: true,
          })}
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
          {...register(`items.${index}.note`)}
          type="text"
          placeholder="메모"
          className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
      </td>
      <td className="px-4 py-4 text-sm text-right">
        <button type="button" className="text-red-600 hover:text-red-900">
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">삭제</span>
        </button>
      </td>
    </tr>
  );
};
