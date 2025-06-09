import { Dispatch, SetStateAction } from "react";
import { CategoryEntity, IExpense, PayMethodEntity } from "@/types";
import {
  DelTableExpenseHandler,
  SplitAmountHandler,
  UpdTableExpenseHandler,
  UpdActualAmountHandler,
} from "./handlers";

export interface ExpensesProps {
  newExpenses: IExpense[];
  setNewExpenses: Dispatch<SetStateAction<IExpense[]>>;
  categories: CategoryEntity[];
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
