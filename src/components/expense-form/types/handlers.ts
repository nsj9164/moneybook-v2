import { IExpense } from "@/types/expense-types";

export type UpdTableExpenseHandler = (
  value: IExpense[keyof IExpense],
  id: number,
  key: keyof IExpense
) => void;

export type DelTableExpenseHandler = (id: number) => void;

export type SplitAmountHandler = (peoplcCnt: string, id: number) => void;
