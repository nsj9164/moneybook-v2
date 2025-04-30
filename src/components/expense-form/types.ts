import { ICategory, IExpense, IPayMethod } from "@/types/expense-types";

export interface expensesProps {
  newExpenses: IExpense[];
  setNewExpenses: (expenses: IExpense[]) => void;
  categories: ICategory[];
  payMethods: IPayMethod[];
}
