import { CardSection } from "@/components/common/layout/CardSection";
import { CategorySummary } from "@/features/statistics/types/MonthlyStatistics";
import { useState } from "react";
import { ToggleIncomeExpenses } from "../ToggleIncomeExpenses";
import EChartsReact from "echarts-for-react";

interface MonthlyStatsProps {
  categorySummary: { income: CategorySummary[]; expenses: CategorySummary[] };
}

export const MonthlyStats = ({ categorySummary }: MonthlyStatsProps) => {
  const { income, expenses } = categorySummary;
  const [showIncome, setShowIncome] = useState(false);
  const toggleIncomeExpenses = () => setShowIncome(!showIncome);

  const incomeOption = {
    title: { text: "수입 추이" },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: income.map((item) => item.category),
    },
    yAxis: { type: "value" },
    series: [
      {
        data: income.map((item) => item.currentAmount),
        type: "line",
        smooth: true,
      },
    ],
  };

  const expenseOption = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ["카테고리", "지난달", "이번달"],
        ...expenses.map((c) => [c.category, c.previousAmount, c.currentAmount]),
      ],
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [
      { type: "bar", seriesLayoutBy: "row" },
      { type: "bar", seriesLayoutBy: "row" },
    ],
  };

  return (
    <CardSection
      title="카테고리별 월별 추이"
      action={
        <ToggleIncomeExpenses
          showIncome={showIncome}
          toggleIncomeExpenses={toggleIncomeExpenses}
        />
      }
    >
      <EChartsReact option={showIncome ? incomeOption : expenseOption} />
    </CardSection>
  );
};

// <div className="mt-6 flex items-center justify-center space-x-6">
//   <div className="flex items-center">
//     <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
//     <span className="text-sm text-gray-600">지난달</span>
//   </div>
//   <div className="flex items-center">
//     <div className="w-4 h-4 bg-gray-700 rounded mr-2"></div>
//     <span className="text-sm text-gray-600">이번달</span>
//   </div>
// </div>
