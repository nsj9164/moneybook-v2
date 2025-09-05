import { TransactionSaved } from "@/types";

export type UpdTableExpenseHandler = (
  value: TransactionSaved[keyof TransactionSaved],
  id: number,
  key: keyof TransactionSaved
) => void;

export type DelTableExpenseHandler = (id: number) => void;

export type SplitAmountHandler = (peoplcCnt: number, id: number) => void;

export type UpdActualAmountHandler = (
  amount: string,
  id: number,
  peopleCnt: number
) => void;
