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
}

export interface ICategory {
  id: string;
  name: string;
  targetAmount: number;
  transactionType: number;
}

export interface IPayMethod {
  id: string;
  name: string;
  billingStartDay: number;
  billingEndDay: number;
  typeId: number;
}
