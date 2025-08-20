import { TempId, UUID } from "@/types/ids";

export interface ExpenseBase {
  date: string;
  itemName: string;
  amount: number;
  actualAmount: number;
  note: string;
  transactionType: number;
  paymentMethodId: number;
  categoryId: number;
  recurringExpenseId?: number;
  isDifferentAmount: boolean;
  numberOfPeople?: number;
  paymentMethods?: { name: string };
  categories?: { name: string };
}

export interface ExpenseEntity extends ExpenseBase {
  id: number | TempId;
}

export interface ExpenseSaved extends ExpenseBase {
  id: number;
}
