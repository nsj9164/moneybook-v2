import {
  RecurringDisplay,
  ExpenseSaved,
  CategorySaved,
  PayMethodSaved,
} from "@/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "moneybook",
  storage: localStorage,
});

export const expensesState = atom<ExpenseSaved[]>({
  key: "expensesState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoriesState = atom<CategorySaved[]>({
  key: "categoriesState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const payMethodsState = atom<PayMethodSaved[]>({
  key: "payMethodsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const recurringState = atom<RecurringDisplay[]>({
  key: "recurringState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
