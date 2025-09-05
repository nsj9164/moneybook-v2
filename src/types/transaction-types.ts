import { TempId } from "@/types/ids";

export interface TransactionBase {
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

export interface TransactionInsertDTO extends TransactionBase {
  id: TempId;
}

export interface TransactionSaved extends TransactionBase {
  id: number;
}

export type TransactionEntity = TransactionInsertDTO | TransactionSaved;

export type TransactionUpdateDTO = {
  id: number;
} & Partial<TransactionBase>;
