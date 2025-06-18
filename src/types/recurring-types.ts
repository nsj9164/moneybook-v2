import { EntityId } from "./ids";

export interface RecurringEntity {
  id: EntityId;
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
