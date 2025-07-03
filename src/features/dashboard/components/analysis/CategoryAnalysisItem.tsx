import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnalysisCard } from "../../layout/DashboardSectionCard";

export const CategoryAnalysisItem = () => {
  return (
    <div key={category.name} className="flex items-center">
      <div
        className={`w-4 h-4 rounded-full ${category.color} mr-3 flex-shrink-0`}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-900">
            {category.name}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(category.value)}
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${category.percentage}%` }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className={`h-2 rounded-full ${category.color}`}
            />
          </div>
          <span className="text-xs text-gray-500 w-10 text-right">
            {category.percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};
