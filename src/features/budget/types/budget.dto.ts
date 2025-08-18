import { BudgetEntity } from "./budget.entity";

export type BudgetInsertDTO = Omit<BudgetEntity, "id"> & {
  categoryId: number;
};

export type BudgetUpdateDTO = {
  id: number;
} & Partial<Pick<BudgetEntity, "categoryId" | "amount">>;
