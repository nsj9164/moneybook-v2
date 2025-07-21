export interface YearlyStatisticsResponse {
  topItems: TopItem[];
  bestMonth: MonthSummary;
  worstMonth: MonthSummary;
  topCategories: TopCategory[];
  yearlyFinance: YearlyFinance[];
  monthlyFinance: MonthlyFinance[];
  budgetAchievement: BudgetAchievement;
  topPaymentMethods: TopPaymentMethod[];
  yearlyFixedExpenses: YearlyFixedExpense;
}

export interface TopItem {
  itemName: string;
  count: number;
  amount: number;
}

export interface MonthSummary {
  month: number; // 1~12
  amount: number;
}

export interface TopCategory {
  category: string;
  amount: number;
}

export interface YearlyFinance {
  year: number;
  income: number;
  saving: number;
  expense: number;
}

export interface MonthlyFinance {
  month: number;
  income: number;
  saving: number;
  expense: number;
  expenseRate: number;
}

export interface BudgetAchievement {
  goalBudget: number;
  usedBudget: number;
  achievementPct: number;
}

export interface TopPaymentMethod {
  name: string;
  amount: number;
  rate: number;
}

export interface YearlyFixedExpense {
  total: number;
  details: FixedExpenseDetail[] | null;
  percentageOfTotalExpense: number | null;
}

export interface FixedExpenseDetail {
  itemName: string;
  amount: number;
}
