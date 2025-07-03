export interface DashboardSummary {
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

export interface ExpenseSummary {
  expense: number;
  lastExpense: number;
  monthlyExpenseRate: number;
  isExpenseIncrease: boolean;
}

export interface IncomeSummary {
  income: number;
  lastIncome: number;
  monthlyIncomeRate: number;
  isIncomeIncrease: boolean;
}

export interface SavingSummary {
  saving: number;
  savingRate: number;
}

export interface BudgetSummary {
  budget: number;
  budgetRate: number;
}

export interface TrendSummary {
  topCategories: { category: string; amount: number }[];
  lastSixMonths: { month: string; total: number }[];
}

export interface DashboardSummaryResponse
  extends ExpenseSummary,
    IncomeSummary,
    BudgetSummary,
    TrendSummary {
  loading: boolean;
}
