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
  paymentMethods?: { name: string };
  categories?: { name: string };
}
