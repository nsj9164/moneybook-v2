import { TempId } from "@/types/ids";

export interface BudgetBase {
  categoryId: number;
  year: number;
  month: number;
  amount: number;
}

export interface BudgetEntity extends BudgetBase {
  id: number | TempId;
}

export interface BudgetSaved extends BudgetBase {
  id: number;
}
