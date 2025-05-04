import { IExpense, UUID } from "@/types/expense-types";

export type UpdTableExpenseHandler = (
  value: IExpense[keyof IExpense],
  id: UUID,
  key: keyof IExpense
) => void;

export type DelTableExpenseHandler = (id: UUID) => void;

export type SplitAmountHandler = (peoplcCnt: string, id: UUID) => void;
