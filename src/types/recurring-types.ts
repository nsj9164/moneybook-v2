import { TempId } from "./ids";

export interface RecurringBase {
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

export interface RecurringInsertDto extends RecurringBase {
  id: TempId;
}

export interface RecurringSaved extends RecurringBase {
  id: number;
}

export interface RecurringDisplay extends RecurringSaved {
  categoryName?: string;
  categoryColor?: string;
  categoryEmoji?: string;
  paymentMethodName?: string;
  paymentMethodEmoji?: string;
  cycleLabel?: string;
}
