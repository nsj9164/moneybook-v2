import { Dispatch, SetStateAction } from "react";
import { ICategory, IExpense, IPayMethod } from "@/types/expense-types";

export interface expensesProps {
  newExpenses: IExpense[];
  setNewExpenses: Dispatch<SetStateAction<IExpense[]>>;
  categories: ICategory[];
  payMethods: IPayMethod[];
}

export interface expensesFormProps {
  newExpenses: IExpense[];
  setNewExpenses: Dispatch<SetStateAction<IExpense[]>>;
  categories: ICategory[];
  payMethods: IPayMethod[];
  handleUpdExpense: (
    value: IExpense[keyof IExpense],
    id: number,
    key: keyof IExpense
  ) => void;
  handleDelExpense: (id: number) => void;
  getSplitAmount: (peopleCnt: string, id: number) => void;
}
