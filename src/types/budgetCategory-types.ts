import { EntityId } from "./ids";

export interface BudgetEntity {
  id: EntityId;
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
  id: EntityId;
  year: number;
  month: number;
  amount: number;
  spent: number;
}
