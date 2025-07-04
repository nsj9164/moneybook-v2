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
  monthlyExpenseRate: number;
  isExpenseIncrease: boolean;
}

export interface IncomeSummary {
  income: number;
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

export type TopCategory = {
  category: string;
  color: string;
  amount: number;
  percent: number;
};
export type LastSixMonth = { month: string; total: number };

export interface TrendSummary {
  topCategories: TopCategory[];
  lastSixMonths: LastSixMonth[];
}

export interface DashboardSummaryResponse
  extends ExpenseSummary,
    IncomeSummary,
    SavingSummary,
    BudgetSummary,
    TrendSummary {
  loading: boolean;
  lastExpense: number;
  lastIncome: number;
}
