import { BudgetSaved, BudgetEntity } from "./budget.entity";

export type BudgetRecord = BudgetSaved | BudgetEntity;

export const isSaved = (b: BudgetRecord): b is BudgetSaved =>
  typeof b.id === "number";

export const isDraft = (b: BudgetRecord): b is BudgetEntity =>
  typeof b.id === "string";
