import { formatCurrency } from "@/utils/format";
import { Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { BudgetDisplay } from "../../types/budget.display";

interface BudgetCategoryItemProps {
  budget: BudgetDisplay;
  progress: number;
  diffAmount: number;
  openModal: () => void;
  onDelete: (id: number) => void;
}

export const BudgetCategoryItem = ({
  budget,
  progress,
  diffAmount,
  openModal,
  onDelete,
}: BudgetCategoryItemProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div
            className="h-10 w-10 rounded-full ${category.color} flex items-center justify-center"
            style={{ backgroundColor: budget.color }}
          >
            <span className="text-white text-sm font-medium">
              {budget.emoji}
            </span>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-900">{budget.name}</h3>
            <p className="text-xs text-gray-500">
              {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="text-gray-400 hover:text-emerald-600"
            onClick={openModal}
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            className="text-gray-400 hover:text-red-600"
            onClick={() => onDelete(budget.categoryId)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-500">사용률</span>
          <span
            className={`text-xs font-medium ${
              progress > 100
                ? "text-red-600"
                : progress > 80
                ? "text-amber-600"
                : "text-gray-700"
            }`}
          >
            {progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.5 }}
            className={`h-2 rounded-full ${
              progress > 100
                ? "bg-red-500"
                : progress > 80
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
          ></motion.div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {diffAmount > 0
            ? `남은 금액: ${formatCurrency(diffAmount)}`
            : `초과 금액: ${formatCurrency(diffAmount * -1)}`}
        </p>
      </div>
    </div>
  );
};
