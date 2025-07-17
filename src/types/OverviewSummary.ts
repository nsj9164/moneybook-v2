export interface OverviewSummary {
  expenseData: ExpenseSummary;
  incomeData: IncomeSummary;
  savingData: SavingSummary;
  budgetData: BudgetSummary;
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
