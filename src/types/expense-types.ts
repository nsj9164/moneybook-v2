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

export interface CategoryEntity {
  id: number;
  name: string;
  targetAmount: number;
  transactionType: number;
  emoji: string;
  color: string;
  defaultYn: boolean;
  userId: UUID;
}

export type CategoryInput = Partial<Omit<CategoryEntity, "id">>;

export interface PayMethodEntity {
  id: number;
  name: string;
  billingStartDay?: number;
  billingEndDay?: number;
  typeId: number;
  emoji: string;
  defaultYn: boolean;
}

export type PayMethodInput = Partial<Omit<PayMethodEntity, "id">>;

export interface RecurringEntity {
  id: number;
  name: string;
  amount: number;
  cycle: number;
  billingStartDate: string;
  billingEndDate?: string;
  paymentDay: number;
  nextPaymentDate: string;
  isActive: boolean;
  note: string;
  categoryId: number;
  paymentMethodId: number;
}

export interface RecurringDisplay extends RecurringEntity {
  categoryName?: string;
  categoryColor?: string;
  categoryEmoji?: string;
  paymentMethodName?: string;
  paymentMethodEmoji?: string;
  cycleLabel?: string;
}

export type RecurringInput = Partial<Omit<RecurringEntity, "id">>;
