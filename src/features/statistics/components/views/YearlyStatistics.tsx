import { MonthlyFinanceTrend } from "../YearlyStats/MonthlyFinanceTrend";
import { YearlyFinanceTrend } from "../YearlyStats/YearlyFinanceTrend";
import { BudgetAchievementRate } from "../YearlyStats/BudgetAchievementRate";
import { MonthlyExpenseComparison } from "../YearlyStats/MonthlyExpenseComparison";
import { TopSpendingCategories } from "../YearlyStats/TopSpendingCategories";
import { TopFrequentItems } from "../YearlyStats/TopFrequentItems";
import { TopPaymentMethods } from "../YearlyStats/TopPaymentMethods";
import { YearlyFixedExpenses } from "../YearlyStats/YearlyFixedExpenses";

export const YearlyStatistics = () => {
  return (
    <div className="space-y-6">
      {/* 월별 수입/지출/저축 추이 (기존 월간에서 이동) */}
      <MonthlyFinanceTrend />

      {/* 연간 재정 추이 */}
      <YearlyFinanceTrend />

      {/* 예산 달성률 & 월별 비교 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetAchievementRate />

        <MonthlyExpenseComparison />
      </div>

      {/* 소비 TOP 3 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopSpendingCategories />

        <TopFrequentItems />
      </div>

      {/* 결제수단 & 고정비 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPaymentMethods />

        <YearlyFixedExpenses />
      </div>
    </div>
  );
};
