import { BudgetSaved, BudgetDraft } from "./budget.entity";

export type BudgetRecord = BudgetSaved | BudgetDraft;

export const isSaved = (b: BudgetRecord): b is BudgetSaved =>
  typeof b.id === "number";

export const isDraft = (b: BudgetRecord): b is BudgetDraft =>
  typeof b.id === "string";
