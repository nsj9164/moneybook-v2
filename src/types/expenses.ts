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
