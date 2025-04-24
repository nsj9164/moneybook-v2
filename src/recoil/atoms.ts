import { IExpense } from "@/types/expenses";
import { atom } from "recoil";

export const expensesState = atom<IExpense[]>({
  key: "expensesState",
  default: [],
});
