import {
  PayMethodEntity,
  RecurringDisplay,
  IExpense,
  CategoryDraft,
} from "@/types";
import { atom } from "recoil";

export const expensesState = atom<IExpense[]>({
  key: "expensesState",
  default: [],
});

export const categoriesState = atom<CategoryDraft[]>({
  key: "categoriesState",
  default: [],
});

export const payMethodsState = atom<PayMethodEntity[]>({
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

export const budgetState = atom<CategoryStatDisplay[]>({
  key: "budgetState",
  default: [],
});
