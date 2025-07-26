import { WeekdaySummary } from "@/features/statistics/types/MonthlyStatistics";
import { useMemo } from "react";

export const useWeekdaySpendingAverage = (
  weekdayCategoryAverage: WeekdaySummary[]
) => {
  const datePerDay = useMemo(() => {
    return Array.from({ length: 7 }, (_, idx) => {
      const found = weekdayCategoryAverage.find((d) => d.weekday === idx);
      return found?.categories.reduce((sum, c) => sum + c.average, 0) ?? 0;
    });
  }, [weekdayCategoryAverage]);

  const weekdayAvg = useMemo(() => {
    const sum = datePerDay.slice(0, 5).reduce((s, v) => s + v, 0);
    return sum / 5;
  }, [datePerDay]);

  const weekendAvg = useMemo(() => {
    const sum = datePerDay.slice(5).reduce((s, v) => s + v, 0);
    return sum / 2;
  }, [datePerDay]);

  return { weekdayAvg, weekendAvg };
};
