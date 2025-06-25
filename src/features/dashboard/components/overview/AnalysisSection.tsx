import { CategoryBreakdown } from "../analysis/CategoryBreakdown";
import { MonthlySpendingTrend } from "../analysis/MonthlySpendingTrend";

export const AnalysisSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 카테고리별 지출 */}
      <CategoryBreakdown />

      {/* 지출 추이 */}
      <MonthlySpendingTrend />
    </div>
  );
};
