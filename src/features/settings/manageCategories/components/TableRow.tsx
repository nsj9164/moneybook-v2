import { Pencil, Trash2 } from "lucide-react";
import { CategorySaved } from "@/types";
import { categoryColorOptions } from "../constants/categoryColorOptions";

interface TableRowProps {
  category: CategorySaved;
  openModal: (category: CategorySaved) => void;
  onDelete: (id: number) => void;
}

export const TableRow = ({ category, openModal, onDelete }: TableRowProps) => {
  return (
    <tr className="hover:bg-gray-50">
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
            onClick={() => openModal(category)}
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
