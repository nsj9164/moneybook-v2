export interface TopCategory {
  category: string;
  color: string;
  amount: number;
  percent: number;
}

export interface LastSixMonth {
  month: string;
  total: number;
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

export interface TrendSummary {
  topCategories: TopCategory[];
  lastSixMonths: LastSixMonth[];
}

export interface DashboardSummaryState {
  expenseSummary: ExpenseSummary;
  incomeSummary: IncomeSummary;
  savingSummary: SavingSummary;
  budgetSummary: BudgetSummary;
  trendSummary: TrendSummary;
}
