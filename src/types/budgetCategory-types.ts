export type BudgetId = number | `temp_${string}`;
export interface BudgetEntity {
  id: BudgetId;
  budgetId?: number;
  categoryId: number | undefined;
  year: number;
  month: number;
  amount: number;
  copiedFromId?: number;
}

export interface UnBudgetDisplay {
  categoryId: number;
  name: string;
  emoji: string;
  color: string;
}

export interface BudgetDisplay extends UnBudgetDisplay {
  id: BudgetId;
  year: number;
  month: number;
  amount: number;
  spent: number;
}
