import { CardSection } from "@/components/common/layout/CardSection";
import { BudgetAchievement } from "../../types/YearlyStatistics";
import { motion } from "framer-motion";

export const BudgetAchievementRate = ({
  budgetAchievement,
}: {
  budgetAchievement: BudgetAchievement;
}) => {
  const { achievementPct } = budgetAchievement;
  return (
    <CardSection title="예산 달성률">
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-emerald-600 mb-2">
          {achievementPct}%
        </div>
        <div className="text-sm text-gray-600">연간 예산 목표 달성률</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${achievementPct}%` }}
          transition={{ duration: 1 }}
          className="h-4 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
        />
      </div>
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600">
          {achievementPct >= 100 ? "🎉 목표 달성!" : "💪 목표까지 조금 더!"}
        </div>
      </div>
    </CardSection>
  );
};
