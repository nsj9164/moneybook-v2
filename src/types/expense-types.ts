import { TempId } from "@/types/ids";

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

export interface ExpenseInsertDTO extends ExpenseBase {
  id: TempId;
}

export interface ExpenseSaved extends ExpenseBase {
  id: number;
}

export type ExpenseEntity = ExpenseInsertDTO | ExpenseSaved;

export type ExpenseUpdateDTO = {
  id: number;
} & Partial<ExpenseBase>;
