export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  budgetProgress: number;
  remainingDay: number;
  remainingPercent: number;
  averagePerDay: number;
  isCurrentMonth: boolean;
  isPastMonth: boolean;
}
