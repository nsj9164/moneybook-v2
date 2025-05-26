export type UUID = string;

export interface IExpense {
  id: UUID;
  date: string;
  itemName: string;
  amount: number;
  actualAmount: number;
  note: string;
  paymentMethodId: number;
  categoryId: number;
  recurringExpenseId?: number;
  isDifferentAmount: boolean;
  numberOfPeople?: number;
  isModified?: boolean;
  paymentMethods?: { name: string };
  categories?: { name: string };
}

export interface ICategory {
  id: number;
  name: string;
  targetAmount?: number;
  transactionType?: number;
  emoji: string;
  color: string;
  defaultYn: boolean;
  isModified?: boolean;
}

export interface IPayMethod {
  id: number;
  name: string;
  billingStartDay: number;
  billingEndDay: number;
  typeId: number;
  emoji: string;
  color: string;
  defaultYn: boolean;
}
