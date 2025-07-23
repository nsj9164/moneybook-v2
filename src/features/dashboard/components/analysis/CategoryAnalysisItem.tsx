import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";
import { TopCategory } from "../../types/DashboardSummary";

type CategoryAnalysisItemProps = TopCategory & { index: number };

export const CategoryAnalysisItem = ({
  category,
  color,
  amount,
  percent,
  index,
}: CategoryAnalysisItemProps) => {
  return (
    <div className="flex items-center">
      <div className={`w-4 h-4 rounded-full ${color} mr-3 flex-shrink-0`} />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-900">{category}</span>
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(amount)}
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="h-2 rounded-full"
              style={{ backgroundColor: `${color}` }}
            />
          </div>
          <span className="text-xs text-gray-500 w-10 text-right">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
};
