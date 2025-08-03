import { Dispatch, SetStateAction } from "react";
import { CategorySaved, IExpense, PayMethodEntity } from "@/types";
import {
  DelTableExpenseHandler,
  SplitAmountHandler,
  UpdTableExpenseHandler,
  UpdActualAmountHandler,
} from "./handlers";

export interface ExpensesProps {
  newExpenses: IExpense[];
  setNewExpenses: Dispatch<SetStateAction<IExpense[]>>;
  categories: CategorySaved[];
  payMethods: PayMethodEntity[];
  handleUpdExpense?: UpdTableExpenseHandler;
  handleDelExpense?: DelTableExpenseHandler;
  getSplitAmount?: SplitAmountHandler;
  updateActualAmount?: UpdActualAmountHandler;
}

export interface ExpensesFormProps
  extends Required<
      Pick<
        ExpensesProps,
        | "handleUpdExpense"
        | "handleDelExpense"
        | "getSplitAmount"
        | "updateActualAmount"
      >
    >,
    Omit<
      ExpensesProps,
      | "handleUpdExpense"
      | "handleDelExpense"
      | "getSplitAmount"
      | "updateActualAmount"
    > {}
