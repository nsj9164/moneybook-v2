import { IPayMethod } from "@/types/expense-types";
import { Pencil, Trash2 } from "lucide-react";

interface TableRowProps {
  method: IPayMethod;
  handleEditPayMethod: (payMethod: IPayMethod) => void;
  handleDeletePayMethod: (id: number) => void;
}

export const TableRow = ({
  method,
  handleEditPayMethod,
  handleDeletePayMethod,
}: TableRowProps) => {
  return (
    <tr key={method.id} className="hover:bg-gray-50">
      <td className="whitespace-nowrap px-6 py-4 text-center text-xl">
        <span role="img" aria-label={method.name}>
          {method.emoji}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {method.name}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {method.defaultYn ? (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
            기본
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
            사용자 정의
          </span>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleEditPayMethod(method)}
            className="text-emerald-600 hover:text-emerald-900"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">편집</span>
          </button>
          {!method.defaultYn && (
            <button
              onClick={() => handleDeletePayMethod(method.id)}
              className="text-red-600 hover:text-red-900"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">삭제</span>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
