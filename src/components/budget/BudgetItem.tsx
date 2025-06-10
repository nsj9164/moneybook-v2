import { CategoryStatDisplay } from "@/types";
import { useFormContext } from "react-hook-form";

interface BudgetItemProps {
  budgetNList: CategoryStatDisplay[];
}

export const BudgetItem = ({ budgetNList }: BudgetItemProps) => {
  const { register } = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          카테고리
        </label>
        <select
          {...register("id", { required: true })}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        >
          <option value="">선택하세요</option>
          {budgetNList.map((budget) => (
            <option key={budget.id} value={budget.id}>
              {budget.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          예산 금액
        </label>
        <input
          {...register("budget", { required: true })}
          type="number"
          placeholder="0"
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
