import { TopCategory, LastSixMonth } from "./DashboardSummary";

export interface DashboardSummaryState {
  loading: boolean;
  lastExpense: number;
  lastIncome: number;

  expenseSummary: {
    expense: number;
    monthlyExpenseRate: number;
    isExpenseIncrease: boolean;
  };

  incomeSummary: {
    income: number;
    monthlyIncomeRate: number;
    isIncomeIncrease: boolean;
  };

  savingSummary: {
    saving: number;
    savingRate: number;
  };

  budgetSummary: {
    budget: number;
    budgetRate: number;
  };

  trendSummary: {
    topCategories: TopCategory[];
    lastSixMonths: LastSixMonth[];
  };
}
