import { TransactionSaved } from "@/types";
import { formatCurrency } from "@/utils/format";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allColumns } from "../../types/filters";

interface RowProps {
  data: TransactionSaved;
  checked: boolean;
  toggleItemSelection: (id: number) => void;
}
export const TableRow = ({ data, checked, toggleItemSelection }: RowProps) => {
  const navigate = useNavigate();
  const handleEdit = (id: number) => {
    navigate(`/transactions/edit?ids=${id}`);
  };

  return (
    <tr
      key={data.id}
      className={`hover:bg-gray-50 ${
        data.recurringExpenseId ? "bg-blue-50" : ""
      } ${data.isDifferentAmount ? "bg-amber-50" : ""}`}
    >
      <td className="w-12 px-6 py-4 sm:w-16 sm:px-8">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          checked={checked}
          onChange={() => toggleItemSelection(data.id)}
        />
      </td>
      {allColumns.find((col) => col.id === "date") && (
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
          {data.date}
        </td>
      )}
      {allColumns.find((col) => col.id === "category") && (
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${
                          data.categoryId === 0
                            ? "bg-rose-100 text-rose-800"
                            : data.categoryId === 1
                            ? "bg-blue-100 text-blue-800"
                            : data.categoryId === 2
                            ? "bg-emerald-100 text-emerald-800"
                            : data.categoryId === 3
                            ? "bg-purple-100 text-purple-800"
                            : "bg-amber-100 text-amber-800"
                        }
                        `}
          >
            {data.categories?.name}
          </span>
        </td>
      )}
      {allColumns.find((col) => col.id === "itemName") && (
        <td className="px-6 py-4 text-sm text-gray-900">{data.itemName}</td>
      )}
      {allColumns.find((col) => col.id === "amount") && (
        <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-medium">
          {formatCurrency(data.amount)}
        </td>
      )}
      {allColumns.find((col) => col.id === "actualAmount") && (
        <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-medium">
          {formatCurrency(data.actualAmount)}
        </td>
      )}
      {allColumns.find((col) => col.id === "paymentMethod") && (
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
          {data.paymentMethods?.name}
        </td>
      )}
      {allColumns.find((col) => col.id === "note") && (
        <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">
          {data.note}
        </td>
      )}
      <td className="whitespace-nowrap px-6 py-4 text-sm text-right">
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => handleEdit(data.id)}
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
