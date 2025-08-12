export interface BudgetBase {
  categoryId: number | undefined;
  year: number;
  month: number;
  amount: number;
}

export interface BudgetSaved extends BudgetBase {
  id: number;
}

export type BudgetRow = {
  budgetId: number;
  categoryId: number;
  year: number;
  month: number;
  amount: number;
  spent?: number | null;
  name: string;
  emoji: string;
  color: string;
};

export type UnBudgetRow = {
  categoryId: number;
  name: string;
  emoji: string;
  color: string;
};

export interface UnBudgetDisplay {
  categoryId: number;
  name: string;
  emoji: string;
  color: string;
}

export interface BudgetDisplay extends UnBudgetDisplay {
  id: number;
  year: number;
  month: number;
  amount: number;
  spent: number;
}

export interface BudgetCategoriesOptions {
  selectedDate: { year: number; month: number };
}
