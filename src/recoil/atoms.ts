import {
  RecurringDisplay,
  IExpense,
  CategorySaved,
  PayMethodSaved,
} from "@/types";
import { atom } from "recoil";

export const expensesState = atom<IExpense[]>({
  key: "expensesState",
  default: [],
});

export const categoriesState = atom<CategorySaved[]>({
  key: "categoriesState",
  default: [],
});

export const payMethodsState = atom<PayMethodSaved[]>({
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
