import { Dispatch, SetStateAction } from "react";
import { CategorySaved, ExpenseSaved, PayMethodSaved } from "@/types";
import {
  DelTableExpenseHandler,
  SplitAmountHandler,
  UpdTableExpenseHandler,
  UpdActualAmountHandler,
} from "./handlers";

export interface ExpensesProps {
  editExpenses: ExpenseSaved[];
  // setNewExpenses: Dispatch<SetStateAction<ExpenseSaved[]>>;
  categories: CategorySaved[];
  payMethods: PayMethodSaved[];
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
