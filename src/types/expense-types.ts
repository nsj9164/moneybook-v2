export type UUID = string;

export interface IExpense {
  id: UUID;
  date: string;
  itemName: string;
  amount: string;
  actualAmount: string;
  note: string;
  paymentMethodId: number;
  categoryId: number;
  isDifferentAmount: boolean;
  numberOfPeople?: number;
  isModified?: boolean;
  paymentMethods?: { name: string };
  categories?: { name: string };
}

export interface ICategory {
  id: number;
  name: string;
  targetAmount: number;
  transactionType: number;
}

export interface IPayMethod {
  id: number;
  name: string;
  billingStartDay: number;
  billingEndDay: number;
  typeId: number;
}
