export interface OverviewSummary {
  expenseData: ExpenseSummary;
  incomeData: IncomeSummary;
  savingData: SavingSummary;
  budgetData: BudgetSummary;
}

export interface ExpenseSummary {
  expense: number;
  expenseRate: number;
  isIncrease: boolean;
}

export interface IncomeSummary {
  income: number;
  incomeRate: number;
  isIncrease: boolean;
}

export interface SavingSummary {
  saving: number;
  savingRate: number;
  isIncrease: boolean;
}

export interface BudgetSummary {
  budget: number;
  budgetRate: number;
  isIncrease: boolean;
}
