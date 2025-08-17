import { BudgetDraft, BudgetEntity } from "./budget.entity";

export type BudgetInsertDTO = Omit<BudgetDraft, "id"> & {
  categoryId: number;
};

export type BudgetUpdateDTO = {
  id: number;
} & Partial<Pick<BudgetEntity, "categoryId" | "amount">>;
