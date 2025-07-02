export interface IDashboardSummary {
  budget: { goal: number; used: number };
  thisMonth: {
    income: number;
    expense: number;
    saving: number;
    budgetUsed: number;
  };
  lastMonth: { income: number; expense: number };
  last6Months: { month: string; total: number }[];
  topCategories: { category: string; amount: number }[];
}
