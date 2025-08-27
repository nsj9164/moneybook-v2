import { CreditCard } from "lucide-react";
import { PaymentMethodSummary } from "../../../types/MonthlyStatisticsType";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/format";
import { ChangeIndicator } from "../../../../../components/summaryCard/ChangeIndicator";

export const MonthlyPaymentItem = ({
  methodData,
  index,
}: {
  methodData: PaymentMethodSummary;
  index: number;
}) => {
  const { method, currentAmount, currentRatio, previousAmount } = methodData;
  const changeRate = Math.round(
    ((currentAmount - previousAmount) / previousAmount) * 100
  );
  const isIncrease = currentAmount - previousAmount > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1">
        <CreditCard className="h-4 w-4 text-gray-400 mr-3" />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">{method}</span>
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(currentAmount)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentRatio}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-2 rounded-full bg-blue-500"
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">{currentRatio}%</span>
            <ChangeIndicator ratio={changeRate} isIncrease={isIncrease} />
          </div>
        </div>
      </div>
    </div>
  );
};
