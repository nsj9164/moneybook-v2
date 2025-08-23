import { TempId } from "@/types/ids";
import { BudgetBase } from "./budget.entity";

export type BudgetInsertDTO = { id: TempId } & BudgetBase;

export type BudgetUpdateDTO = {
  id: number;
} & Partial<BudgetBase>;
