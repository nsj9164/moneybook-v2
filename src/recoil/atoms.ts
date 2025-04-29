import { ICategory, IExpense, IPaymentMethod } from "@/types/expense-types";
import { atom } from "recoil";

export const expensesState = atom<IExpense[]>({
  key: "expensesState",
  default: [],
});

export const categoriesState = atom<ICategory[]>({
  key: "categoriesState",
  default: [],
});

export const paymentMethodsState = atom<IPaymentMethod[]>({
  key: "paymentMethodsState",
  default: [],
});
