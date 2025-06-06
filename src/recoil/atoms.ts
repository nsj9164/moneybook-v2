import {
  ICategory,
  IExpense,
  IPayMethod,
  RecurringDisplay,
} from "@/types/expense-types";
import { atom } from "recoil";

export const expensesState = atom<IExpense[]>({
  key: "expensesState",
  default: [],
});

export const categoriesState = atom<ICategory[]>({
  key: "categoriesState",
  default: [],
});

export const payMethodsState = atom<IPayMethod[]>({
  key: "payMethodsState",
  default: [],
});

export const newExpensesState = atom<IExpense[]>({
  key: "newExpensesState",
  default: [],
});

export const recurringState = atom<RecurringDisplay[]>({
  key: "recurringState",
  default: [],
});
