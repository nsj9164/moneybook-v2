import { RecurringEntity } from "@/types";
import { createTempEntityId } from "@/types/ids";
import { addMonths, format, startOfMonth } from "date-fns";

const today = new Date();
const startOfNextMonth = startOfMonth(addMonths(today, 1));

export const initialRecurrings: RecurringEntity = {
  id: createTempEntityId(),
  name: "",
  amount: 0,
  cycle: 4,
  billingStartDate: format(today, "yyyy-MM-dd"),
  billingEndDate: undefined,
  paymentDay: 1,
  nextPaymentDate: format(startOfNextMonth, "yyyy-MM-dd"),
  note: "",
  isActive: true,
  categoryId: 0,
  paymentMethodId: 0,
};
