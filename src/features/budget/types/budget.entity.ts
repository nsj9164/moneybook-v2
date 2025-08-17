import { TempId } from "@/types/ids";

export interface BudgetBase {
  year: number;
  month: number;
  amount: number;
}

export interface BudgetEntity extends BudgetBase {
  id: number | TempId;
  categoryId: number;
}

export interface BudgetSaved extends BudgetBase {
  id: number;
  categoryId: number;
}

export interface BudgetDraft extends BudgetBase {
  id: TempId;
  categoryId?: number;
}
