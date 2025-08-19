import { CardSection } from "@/components/common/layout/CardSection";
import { CategorySummary } from "@/features/statistics/types/MonthlyStatistics";
import { useState } from "react";
import { ToggleIncomeExpenses } from "../ToggleIncomeExpenses";
import EChartsReact from "echarts-for-react";
import { monthlyStatsOption } from "./monthlyStatsOption";

interface MonthlyStatsProps {
  categorySummary: {
    income: CategorySummary[];
    expense: CategorySummary[];
  };
}

export const MonthlyStats = ({ categorySummary }: MonthlyStatsProps) => {
  const [showIncome, setShowIncome] = useState(false);
  const toggleButton = () => setShowIncome((prev) => !prev);

  const { incomeOption, expenseOption } = monthlyStatsOption({
    categorySummary,
  });

  return (
    <CardSection
      title="카테고리별 월별 추이"
      action={
        <ToggleIncomeExpenses
          showIncome={showIncome}
          toggleButton={toggleButton}
        />
      }
    >
      <EChartsReact
        option={showIncome ? incomeOption : expenseOption}
        style={{ height: 400, width: "100%" }}
        notMerge
        lazyUpdate
      />
    </CardSection>
  );
};
