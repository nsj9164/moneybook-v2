import { IExpense } from "@/types/expense-types";

export const handleDelNewExpense = (id: number) => {
  setNewExpenses((prev) => prev.filter((item) => item.id !== id));
};
