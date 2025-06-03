import { IRecurring } from "@/types/expense-types";
import { addMonths, startOfMonth } from "date-fns";

export const initialRecurrings: IRecurring = {
  id: Date.now(),
  name: "",
  amount: 0,
  cycle: 4,
  billingStartDay: new Date(),
  billingEndDay: undefined,
  paymentDay: 1,
  nextPaymentDate: startOfMonth(addMonths(new Date(), 1)),
  note: "",
  isActive: true,
  categoryId: 0,
  paymentMethodId: 0,
};
