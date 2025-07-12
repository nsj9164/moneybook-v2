import { CardSection } from "@/components/common/layout/CardSection";
import { useState } from "react";
import { ToggleIncomeExpenses } from "../ToggleIncomeExpenses";

export const MonthlyStats = () => {
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
      {showIncome ? (
        // 수입 차트 (기존 유지)
        <MonthlyIncomeStats />
      ) : (
        // 카테고리별 지출 비교 차트
        <MonthlyExpensesStats />
      )}

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
