import { CardSection } from "@/components/common/layout/CardSection";
import {
  CategorySummary,
  MonthlyStatisticsResponse,
} from "@/features/statistics/types/MonthlyStatistics";
import { useState } from "react";
import { ToggleIncomeExpenses } from "../ToggleIncomeExpenses";
import { MonthlyExpensesBar, MonthlyExpensesStats } from "./MonthlyExpensesBar";
import { MonthlyIncomeBar } from "./MonthlyIncomeBar";

interface MonthlyStatsProps {
  categorySummary: { income: CategorySummary[]; expenses: CategorySummary[] };
}

export const MonthlyStats = ({ categorySummary }: MonthlyStatsProps) => {
  const { income, expenses } = categorySummary;
  const [showIncome, setShowIncome] = useState(false);
  const toggleIncomeExpenses = () => setShowIncome(!showIncome);
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
      <div className="h-80">
        <div className="h-full flex items-end justify-between space-x-4">
          {showIncome
            ? income.map((item, index) => {
                const maxValue = Math.max(...monthlyData.map((d) => d.income));
                const height = (item.income / maxValue) * 100;
                const isCurrentMonth = item.month === `${selectedMonth}월`;

                return <MonthlyIncomeBar key={index} income={item} />;
              })
            : currentMonthCategories.map((category, index) => {
                const maxValue = Math.max(
                  ...currentMonthCategories.flatMap((c) => [
                    c.currentMonth,
                    c.lastMonth,
                  ])
                );
                const currentHeight = (category.currentMonth / maxValue) * 100;
                const lastHeight = (category.lastMonth / maxValue) * 100;

                return <MonthlyExpensesBar key={index} expenses={category} />;
              })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
          <span className="text-sm text-gray-600">지난달</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-700 rounded mr-2"></div>
          <span className="text-sm text-gray-600">이번달</span>
        </div>
      </div>
    </CardSection>
  );
};
