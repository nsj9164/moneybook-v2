import { TopCategory } from "@/features/statistics/types/YearlyStatistics";
import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";

interface TopSpendingCategoriesItemProps {
  category: TopCategory;
  widthPercent: number;
  index: number;
}

export const TopSpendingCategoriesItem = ({
  category,
  widthPercent,
  index,
}: TopSpendingCategoriesItemProps) => {
  return (
    <div key={category.category} className="flex items-center">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
        {index + 1}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            {category.category}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(category.amount)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${widthPercent}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
          />
        </div>
      </div>
    </div>
  );
};
