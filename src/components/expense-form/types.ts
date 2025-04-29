import { IExpense } from "@/types/expense-types";

export interface expensesProps {
  newExpenses: IExpense[];
  setNewExpenses: (expenses: IExpense[]) => void;
}
