import {
  RecurringDisplay,
  TransactionSaved,
  CategorySaved,
  PayMethodSaved,
} from "@/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "moneybook",
  storage: localStorage,
});

export const transactionsState = atom<TransactionSaved[]>({
  key: "transactionsState",
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
