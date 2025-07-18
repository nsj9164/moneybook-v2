export interface OverviewSummary {
  expenseData: ExpenseSummary;
  incomeData: IncomeSummary;
  savingData: SavingSummary;
  budgetData: BudgetSummary;
}

export interface ExpenseSummary {
  expense: number;
  monthlyExpenseRate: number;
  isIncrease: boolean;
}

export interface IncomeSummary {
  income: number;
  monthlyIncomeRate: number;
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
