import { Pencil, Trash2 } from "lucide-react";
import { categoryColorOptions } from "../constants/CategoryConstants";
import { ICategory } from "@/types/expense-types";

interface TableRowProps {
  category: ICategory;
  onEdit: (category: ICategory) => void;
  onDelete: (id: number) => void;
}

export const TableRow = ({ category, onEdit, onDelete }: TableRowProps) => {
  return (
    <tr key={category.id} className="hover:bg-gray-50">
      <td className="whitespace-nowrap px-6 py-4 text-center text-xl">
        <span role="img" aria-label={category.name}>
          {category.emoji}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {category.name}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center">
          <div
            className="h-5 w-5 rounded-full"
            style={{ backgroundColor: category.color }}
          ></div>
          <span className="ml-2 text-sm text-gray-500">
            {categoryColorOptions.find((c) => c.value === category.color)
              ?.name || "사용자 지정"}
          </span>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {category.defaultYn ? (
          <span className="...">
            기본 ({typeof category.defaultYn}: {String(category.defaultYn)})
          </span>
        ) : (
          <span className="...">
            사용자 정의 ({typeof category.defaultYn}:{" "}
            {String(category.defaultYn)})
          </span>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(category)}
            className="text-emerald-600 hover:text-emerald-900"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">편집</span>
          </button>
          {!category.defaultYn && (
            <button
              onClick={() => onDelete(category.id)}
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
