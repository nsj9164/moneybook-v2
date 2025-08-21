import { ExpenseEntity } from "@/types";
import { createTempEntityId } from "@/types/ids";

export const initialExpense: ExpenseEntity = {
  id: createTempEntityId(),
  date: new Date().toISOString().slice(0, 10),
  itemName: "",
  amount: 0,
  actualAmount: 0,
  note: "",
  paymentMethodId: 0,
  categoryId: 0,
  isDifferentAmount: false,
  transactionType: 2,
};
