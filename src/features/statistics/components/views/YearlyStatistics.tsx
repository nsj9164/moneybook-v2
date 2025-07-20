import { MonthlyFinanceTrend } from "../yearlyStats/monthlyFinance/MonthlyFinanceTrend";
import { BudgetAchievementRate } from "../yearlyStats/BudgetAchievementRate";
import { TopSpendingCategories } from "../yearlyStats/topSpendingCategories/TopSpendingCategories";
import { TopFrequentItems } from "../yearlyStats/TopFrequentItems";
import { TopPaymentMethods } from "../yearlyStats/TopPaymentMethods";
import { YearlyFixedExpenses } from "../yearlyStats/YearlyFixedExpenses";
import { YearlyStatisticsResponse } from "../../types/YearlyStatistics";
import { YearlyFinanceTrend } from "../yearlyStats/yearlyFinance/YearlyFinanceTrend";
import { MonthlyExpenseComparison } from "../yearlyStats/MonthlyExpenseComparison";

export const YearlyStatistics = ({
  yearlyData,
}: {
  yearlyData: YearlyStatisticsResponse;
}) => {
  const {
    topItems,
    bestMonth,
    worstMonth,
    topCategories,
    yearlyFinance,
    monthlyFinance,
    budgetAchievement,
    topPaymentMethods,
    yearlyFixedExpenses,
  } = yearlyData;

  return (
    <div className="space-y-6">
      {/* 월별 수입/지출/저축 추이 (기존 월간에서 이동) */}
      <MonthlyFinanceTrend monthlyFinance={monthlyFinance} />

      {/* 연간 재정 추이 */}
      <YearlyFinanceTrend yearlyFinance={yearlyFinance} />

      {/* 예산 달성률 & 월별 비교 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetAchievementRate budgetAchievement={budgetAchievement} />

        <MonthlyExpenseComparison
          bestMonth={bestMonth}
          worstMonth={worstMonth}
        />
      </div>

      {/* 소비 TOP 3 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopSpendingCategories topCategories={topCategories} />

        <TopFrequentItems topItems={topItems} />
      </div>

      {/* 결제수단 & 고정비 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPaymentMethods topPaymentMethods={topPaymentMethods} />

        <YearlyFixedExpenses yearlyFixedExpenses={yearlyFixedExpenses} />
      </div>
    </div>
  );
};
