import { formatCurrency } from "@/utils/format";
import { MonthlyStatisticsResponse } from "../../types/MonthlyStatistics";
import { MonthlyStats } from "../MonthlyStats/MonthlyExpenses/MonthlyStats";
import { MonthlyExpensesByDay } from "../MonthlyStats/MonthlyExpensesByDay";
import { WeeklyExpenses } from "../MonthlyStats/WeeklyExpenses/WeeklyExpenses";
import { StatisticsCard } from "../StatisticsCard";
import { MonthlyPayment } from "../MonthlyStats/MonthlyPayment";
import { MonthlyRecurrings } from "../MonthlyStats/MonthlyRecurrings";
import { NoSpendCalendar } from "../MonthlyStats/NoSpendCalendar";

export const MonthlyStatistics = ({
  monthlyData,
}: {
  monthlyData: MonthlyStatisticsResponse;
}) => {
  const {
    categorySummary,
    noSpendingDays,
    paymentMethods,
    weekdayCategoryAverage,
  } = monthlyData;
  return (
    <div className="space-y-6">
      {/* 카테고리별 월별 지출 추이 */}
      <MonthlyStats categorySummary={categorySummary} />

      {/* 요일별 평균 지출 */}
      <MonthlyExpensesByDay />

      {/* 주별 요약 & 무지출 캘린더 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyExpenses weekdayCategoryAverage={weekdayCategoryAverage} />
        <NoSpendCalendar noSpendingDays={noSpendingDays} />
      </div>

      {/* 지출 하이라이트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatisticsCard
          title="💸 가장 많이 소비한 날"
          mainValue={`${noSpendingStats.highestSpendingDay.day}일`}
          subValue={formatCurrency(noSpendingStats.highestSpendingDay.amount)}
          description="하루 총 지출"
          mainColorClass="text-red-600"
        />

        <StatisticsCard
          title="🛍️ 가장 큰 소비"
          mainValue={noSpendingStats.biggestExpense.item}
          subValue={formatCurrency(noSpendingStats.biggestExpense.amount)}
          description={noSpendingStats.biggestExpense.date}
          mainColorClass="text-purple-600"
        />
      </div>

      {/* 결제수단별 & 고정비 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyPayment paymentMethods={paymentMethods} />
        <MonthlyRecurrings />
      </div>
    </div>
  );
};
