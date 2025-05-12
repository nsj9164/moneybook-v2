import { IExpense, UUID } from "@/types/expense-types";

export type UpdTableExpenseHandler = (
  value: IExpense[keyof IExpense],
  id: UUID,
  key: keyof IExpense
) => void;

export type DelTableExpenseHandler = (id: UUID) => void;

export type SplitAmountHandler = (peoplcCnt: number, id: UUID) => void;

export type UpdActualAmountHandler = (
  amount: string,
  id: UUID,
  peopleCnt: number
) => void;
