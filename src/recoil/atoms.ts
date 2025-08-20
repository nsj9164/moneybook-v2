import {
  RecurringDisplay,
  ExpenseSaved,
  CategorySaved,
  PayMethodSaved,
} from "@/types";
import { atom } from "recoil";

export const expensesState = atom<ExpenseSaved[]>({
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

export const recurringState = atom<RecurringDisplay[]>({
  key: "recurringState",
  default: [],
});
