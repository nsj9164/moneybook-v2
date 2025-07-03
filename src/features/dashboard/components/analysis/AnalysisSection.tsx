import { formatCurrency } from "@/utils/format";
import { SixMonthAnalysisItem } from "./\bSixMonthAnalysisItem";
import { CategoryAnalysisItem } from "./CategoryAnalysisItem";
import { DashboardSectionCard } from "../../layout/DashboardSectionCard";

export const AnalysisSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 카테고리별 지출 차트 */}
      <DashboardSectionCard
        title="카테고리별 지출"
        linkTo="/statistics"
        linkTex="자세히 보기"
      >
        {categoryData.map((category, index) => (
          <CategoryAnalysisItem />
        ))}
      </DashboardSectionCard>

      {/* 월간 지출 추이 차트 */}
      <DashboardSectionCard
        title="월간 지출 추이"
        initialX={20}
        delay={0.5}
        linkTo="/statistics"
        linkTex="자세히 보기"
      >
        {monthlyTrend.map((month, index) => {
          <SixMonthAnalysisItem />;
        })}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">평균 월 지출</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(
                monthlyTrend.reduce((sum, month) => sum + month.expense, 0) /
                  monthlyTrend.length
              )}
            </span>
          </div>
        </div>
      </DashboardSectionCard>
    </div>
  );
};
