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
