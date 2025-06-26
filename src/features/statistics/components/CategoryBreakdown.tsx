import { formatCurrency } from "@/utils/format";
import { StatisticsCard } from "./StatisticsCard";
import { motion } from "framer-motion";

export const CategoryBreakdown = () => {
  return (
    <StatisticsCard title={"카테고리별 지출"}>
      <div className="space-y-4">
        {categoryData.map((category, index) => (
          <div key={category.name} className="flex items-center">
            <div className={`h-4 w-4 rounded ${category.color} mr-3`} />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(category.value)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${category.percentage}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${category.color.replace(
                    "bg-",
                    "bg-"
                  )}`}
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">
                  {category.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StatisticsCard>
  );
};
