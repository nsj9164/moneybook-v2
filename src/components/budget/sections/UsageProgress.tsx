import { CardSection } from "@/components/common/layout/CardSection";
import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";

interface UsageProgressProps {
  budgetProgress: number;
  totalSpent: number;
  totalBudget: number;
}

export const UsageProgress = ({
  budgetProgress,
  totalSpent,
  totalBudget,
}: UsageProgressProps) => {
  return (
    <CardSection
      title="전체 예산 진행 상황"
      action={
        <div className="text-sm font-medium text-gray-700">
          {budgetProgress}% 사용 ({formatCurrency(totalSpent)} /{" "}
          {formatCurrency(totalBudget)})
        </div>
      }
    >
      <div className="w-full bg-gray-200 rounded-full h-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(budgetProgress, 100)}%` }}
          transition={{ duration: 0.5 }}
          className={`h-4 rounded-full ${
            budgetProgress > 100 ? "bg-red-600" : "bg-emerald-600"
          }`}
        ></motion.div>
      </div>
    </CardSection>
  );
};
