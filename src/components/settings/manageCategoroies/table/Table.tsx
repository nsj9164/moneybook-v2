import { ICategory } from "@/types/expense-types";
import { TableRow } from "./TableRow";

interface CategoryTableProps {
  paginatedCategories: ICategory[];
  handleEditCategory: (category: ICategory) => void;
  handleDeleteCategory: (id: number) => void;
}

export const CategoryTable = ({
  paginatedCategories,
  handleEditCategory,
  handleDeleteCategory,
}: CategoryTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            아이콘
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            카테고리명
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            색상
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            상태
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">편집</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {paginatedCategories.map((category) => (
          <TableRow
            key={category.id}
            category={category}
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
          />
        ))}
      </tbody>
    </table>
  );
};
