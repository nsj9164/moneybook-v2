import { differenceInCalendarDays, lastDayOfMonth } from "date-fns";
import { BudgetSummary, BudgetDisplay } from "../types";

interface ISelectedDate {
  year: number;
  month: number;
}

export const getBudgetSummaryInfo = (
  budgetItems: BudgetDisplay[],
  selectedDate: ISelectedDate
): BudgetSummary => {
  const totalBudget = budgetItems.reduce((sum, list) => sum + list.amount, 0);
  const totalSpent = budgetItems.reduce((sum, list) => sum + list.spent, 0);
  const budgetProgress = Math.round((totalSpent / totalBudget) * 100);
  const remainingBudget = totalBudget - totalSpent;

  const now = new Date();
  const selected = new Date(selectedDate.year, selectedDate.month);
  const lastDay = lastDayOfMonth(selected);
  const isCurrentMonth =
    now.getFullYear() === selected.getFullYear() &&
    now.getMonth() === selected.getMonth();
  const isPastMonth = lastDay < now;

  const remainingDay = isCurrentMonth
    ? differenceInCalendarDays(lastDay, now) + 1
    : 0;

  const totalDays = lastDay.getDate();
  const remainingPercent =
    isCurrentMonth && totalDays ? (remainingDay / totalDays) * 100 : 0;

  const averagePerDay =
    isCurrentMonth && remainingDay > 0
      ? Math.round(remainingBudget / remainingDay)
      : 0;

  return {
    totalBudget,
    totalSpent,
    remainingBudget,
    budgetProgress,
    remainingDay,
    remainingPercent,
    averagePerDay,
    isCurrentMonth,
    isPastMonth,
  };
};
