import { ExpenseSaved } from "@/types";

export type UpdTableExpenseHandler = (
  value: ExpenseSaved[keyof ExpenseSaved],
  id: number,
  key: keyof ExpenseSaved
) => void;

export type DelTableExpenseHandler = (id: number) => void;

export type SplitAmountHandler = (peoplcCnt: number, id: number) => void;

export type UpdActualAmountHandler = (
  amount: string,
  id: number,
  peopleCnt: number
) => void;
