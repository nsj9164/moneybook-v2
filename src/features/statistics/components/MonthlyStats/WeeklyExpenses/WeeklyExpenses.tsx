import { WeekdaySummary } from "../../../types/MonthlyStatistics";
import { WeeklyExpensesByDay } from "./WeeklyExpensesByDay";

export const WeeklyExpenses = ({
  weekdayCategoryAverage,
}: {
  weekdayCategoryAverage: WeekdaySummary[];
}) => {
  //   weekday: number;
  // categories: { categoryId: number; category: string; average: number };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">주별 지출 요약</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {weekdayCategoryAverage.map((week, index) => {
            const maxWeeklyExpense = Math.max(
              ...week.map((w) => w.categories.average)
            );
            const widthPercentage = (week.expense / maxWeeklyExpense) * 100;
            const avgDaily = week.expense / week.days;

            return (
              <WeeklyExpensesByDay
                key={week.weekday}
                weekday={week.weekday}
                categories={week.categories}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
