export interface IExpense {
  id: number;
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
