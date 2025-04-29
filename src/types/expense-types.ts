export interface IExpense {
  id: number;
  date: string;
  itemName: string;
  amount: number;
  actualAmount: number;
  note: string;
  paymentMethodId: number;
  categoryId: number;
  isDifferentAmount: false;
}

export interface ICategory {
  name: string;
  targetAmount: number;
  transactionType: number;
}

export interface IPaymentMethod {
  methodName: string;
  paymentAlias: string;
  billingStartDay: number;
  billingEndDay: number;
  typeId: number;
}
