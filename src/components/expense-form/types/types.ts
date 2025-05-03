import { Dispatch, SetStateAction } from "react";
import { ICategory, IExpense, IPayMethod } from "@/types/expense-types";
import {
  DelTableExpenseHandler,
  SplitAmountHandler,
  UpdTableExpenseHandler,
} from "./handlers";

export interface ExpensesProps {
  newExpenses: IExpense[];
  setNewExpenses: Dispatch<SetStateAction<IExpense[]>>;
  categories: ICategory[];
  payMethods: IPayMethod[];
  handleUpdExpense?: UpdTableExpenseHandler;
  handleDelExpense?: DelTableExpenseHandler;
  getSplitAmount?: SplitAmountHandler;
}

export interface ExpensesFormProps
  extends Required<
      Pick<
        ExpensesProps,
        "handleUpdExpense" | "handleDelExpense" | "getSplitAmount"
      >
    >,
    Omit<
      ExpensesProps,
      "handleUpdExpense" | "handleDelExpense" | "getSplitAmount"
    > {}
