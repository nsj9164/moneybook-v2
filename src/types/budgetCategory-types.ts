import { TempId } from "./ids";

export interface BudgetBase {
  year: number;
  month: number;
  amount: number;
}

export interface BudgetSaved extends BudgetBase {
  id: number;
  categoryId: number;
}

export interface BudgetDraft extends BudgetBase {
  id: TempId;
  categoryId?: number;
}

export interface BudgetEntity extends BudgetBase {
  id: number | TempId;
  categoryId: number;
}

export type BudgetRecord = BudgetSaved | BudgetDraft;

export interface BudgetDisplay extends BudgetSaved {
  spent: number;
  name: string;
  emoji: string;
  color: string;
}

export const isSaved = (b: BudgetRecord): b is BudgetSaved =>
  typeof b.id === "number";

export const isDraft = (b: BudgetRecord): b is BudgetDraft =>
  typeof b.id === "string";

export interface BudgetCategoriesOptions {
  selectedDate: { year: number; month: number };
}
