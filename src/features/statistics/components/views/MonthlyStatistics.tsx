import { formatCurrency } from "@/utils/format";
import { MonthlyStatisticsResponse } from "../../types/MonthlyStatistics";
import { MonthlyStats } from "../monthlyStats/monthlyExpenses/MonthlyStats";
import { MonthlyExpensesByDay } from "../monthlyStats/MonthlyExpensesByDay";
import { WeeklyExpenses } from "../monthlyStats/weeklyExpenses/WeeklyExpenses";
import { StatisticsCard } from "../layout/StatisticsCard";
import { NoSpendingCalendar } from "../monthlyStats/noSpendingCalendar/NoSpendingCalendar";
import { MonthlyPayment } from "../monthlyStats/monthlyPayment/MonthlyPayment";
import { MonthlyRecurrings } from "../monthlyStats/m onthlyRecurrings/MonthlyRecurrings";

export const MonthlyStatistics = ({
  monthlyData,
}: {
  monthlyData: MonthlyStatisticsResponse;
}) => {
  const {
    categorySummary,
    paymentMethods,
    weekdayCategoryAverage,
    weeklySummary,
    recurringExpenses,
    topSpending,
    noSpendingDays,
  } = monthlyData;

  const { highestSpendingDay, largestSingleExpense } = topSpending;

  return (
    <div className="space-y-6">
      {/* 카테고리별 월별 지출 추이 */}
      <MonthlyStats categorySummary={categorySummary} />

      {/* 요일별 평균 지출 */}
      <MonthlyExpensesByDay weekdayCategoryAverage={weekdayCategoryAverage} />

      {/* 주별 요약 & 무지출 캘린더 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyExpenses weeklySummary={weeklySummary} />
        <NoSpendingCalendar noSpendingDays={noSpendingDays} />
      </div>

      {/* 지출 하이라이트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatisticsCard
          title="💸 가장 많이 소비한 날"
          mainValue={`${highestSpendingDay.date}일`}
          subValue={formatCurrency(highestSpendingDay.amount)}
          description="하루 총 지출"
          mainColorClass="text-red-600"
        />

        <StatisticsCard
          title="🛍️ 가장 큰 소비"
          mainValue={largestSingleExpense.name}
          subValue={formatCurrency(largestSingleExpense.amount)}
          description={largestSingleExpense.date}
          mainColorClass="text-purple-600"
        />
      </div>

      {/* 결제수단별 & 고정비 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyPayment paymentMethods={paymentMethods} />
        <MonthlyRecurrings recurringExpenses={recurringExpenses} />
      </div>
    </div>
  );
};
