import { formatCurrency } from "@/utils/format";
import { SixMonthAnalysisItem } from "./SixMonthAnalysisItem";
import { CategoryAnalysisItem } from "./CategoryAnalysisItem";
import { DashboardSectionCard } from "../../layout/DashboardSectionCard";
import { LastSixMonth, TopCategory } from "../../types/DashboardSummary";

interface AnalysisSectionProps {
  topCategories: TopCategory[];
  lastSixMonths: LastSixMonth[];
  selectedMonth: number;
}

export const AnalysisSection = ({
  topCategories,
  lastSixMonths,
  selectedMonth,
}: AnalysisSectionProps) => {
  const { sum, max } = lastSixMonths.reduce(
    (acc, month) => {
      acc.sum += month.total;
      acc.max = Math.max(acc.max, month.total);
      return acc;
    },
    { sum: 0, max: -Infinity }
  );

  const average = sum / lastSixMonths.length;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 카테고리별 지출 차트 */}
      <DashboardSectionCard
        title="카테고리별 지출"
        linkTo="/statistics"
        linkText="자세히 보기"
      >
        {topCategories.map(({ category, color, amount, percent }, index) => (
          <CategoryAnalysisItem
            key={category}
            category={category}
            color={color}
            amount={amount}
            percent={percent}
            index={index}
          />
        ))}
      </DashboardSectionCard>

      {/* 월간 지출 추이 차트 */}
      <DashboardSectionCard
        title="월간 지출 추이"
        initialX={20}
        delay={0.5}
        linkTo="/statistics"
        linkText="자세히 보기"
      >
        {lastSixMonths.map(({ month, total }, index) => (
          <SixMonthAnalysisItem
            key={month}
            month={month}
            total={total}
            max={max}
            index={index}
            selectedMonth={selectedMonth}
          />
        ))}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">평균 월 지출</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(average)}
            </span>
          </div>
        </div>
      </DashboardSectionCard>
    </div>
  );
};
