import { CardSection } from "@/components/common/layout/CardSection";
import { MonthSummary } from "../../types/YearlyStatistics";
import { formatCurrency } from "@/utils/format";

interface MonthlyExpenseComparisonProps {
  bestMonth: MonthSummary;
  worstMonth: MonthSummary;
}

export const MonthlyExpenseComparison = ({
  bestMonth,
  worstMonth,
}: MonthlyExpenseComparisonProps) => {
  return (
    <CardSection title="월별 지출 비교">
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
          <div>
            <div className="text-sm font-medium text-red-700">가장 높은 달</div>
            <div className="text-lg font-bold text-red-600">
              {bestMonth.month}월
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-red-600">
              {formatCurrency(bestMonth.amount)}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
          <div>
            <div className="text-sm font-medium text-emerald-700">
              가장 낮은 달
            </div>
            <div className="text-lg font-bold text-emerald-600">
              {worstMonth.month}월
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-emerald-600">
              {formatCurrency(worstMonth.amount)}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-600 text-center">
            차이: {formatCurrency(bestMonth.amount - worstMonth.amount)}
          </div>
        </div>
      </div>
    </CardSection>
  );
};
