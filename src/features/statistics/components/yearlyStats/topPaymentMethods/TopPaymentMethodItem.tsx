import { TopPaymentMethod } from "@/features/statistics/types/YearlyStatisticsType";
import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";

interface TopPaymentMethodProps {
  method: TopPaymentMethod;
  index: number;
}
export const TopPaymentMethodItem = ({
  method,
  index,
}: TopPaymentMethodProps) => {
  const { name, amount, rate } = method;
  return (
    <div className="flex items-center">
      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
        {index + 1}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{name}</span>
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(amount)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${rate}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
          />
        </div>
      </div>
    </div>
  );
};
