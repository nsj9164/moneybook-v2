import { CardSection } from "@/components/common/layout/CardSection";
import { WeeklySummary } from "../../../types/MonthlyStatistics";
import { WeeklyExpensesByDay } from "./WeeklyExpensesByDay";

export const WeeklyExpenses = ({
  weeklySummary,
}: {
  weeklySummary: WeeklySummary[];
}) => {
  return (
    <CardSection title="주별 지출 요약">
      <div className="space-y-4">
        {weeklySummary.map((week) => (
          <WeeklyExpensesByDay key={week.weekNumber} weekData={week} />
        ))}
      </div>
    </CardSection>
  );
};
