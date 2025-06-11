import { BudgetDisplay } from "@/types";
import { useFormContext } from "react-hook-form";

interface BudgetItemProps {
  index: number;
  categories: BudgetDisplay[];
  onRemove?: () => void;
}

export const BudgetItem = ({ index, categories }: BudgetItemProps) => {
  const { register, watch } = useFormContext();
  const currentCategoryId = watch(`items.${index}.categoryId`);
  const isEditing = !!currentCategoryId;

  const filteredCategories = categories.filter(
    (cat) => !cat.budgetYn || cat.categoryId === currentCategoryId
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          카테고리
        </label>
        <select
          {...register(`items.${index}.categoryId`, { required: true })}
          disabled={isEditing}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        >
          <option value="">선택하세요</option>
          {filteredCategories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          예산 금액
        </label>
        <input
          {...register(`items.${index}.budget`, { required: true })}
          type="number"
          placeholder="0"
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
