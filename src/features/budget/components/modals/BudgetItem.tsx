import { UnBudgetDisplay } from "@/types";
import { useFormContext } from "react-hook-form";

interface BudgetItemProps {
  index: number;
  unBudgets: UnBudgetDisplay[];
}

export const BudgetItem = ({ index, unBudgets }: BudgetItemProps) => {
  const { register, watch } = useFormContext();

  const currentItem = watch(`items.${index}`);
  const selectedId = currentItem?.categoryId;

  const isFixedCategory =
    selectedId !== undefined &&
    !unBudgets.some((b) => b.categoryId === selectedId);

  const selectedCategory = {
    categoryId: selectedId,
    name: currentItem.name,
    emoji: currentItem.emoji,
  };

  const categoryOptions = isFixedCategory ? [selectedCategory] : unBudgets;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          카테고리
        </label>
        <select
          {...register(`items.${index}.categoryId`, {
            required: true,
            valueAsNumber: true,
          })}
          disabled={isFixedCategory}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        >
          <option value={-1}>선택하세요</option>
          {categoryOptions.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.emoji} {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          예산 금액
        </label>
        <input
          {...register(`items.${index}.amount`, {
            required: true,
          })}
          type="number"
          placeholder="0"
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
