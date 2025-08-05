import { CategorySaved, PayMethodSaved, RecurringDisplay } from "@/types";
import { Option } from "../hooks/useCycleOptions";

export const enrichRecurring = (
  saved: RecurringDisplay,
  categories: CategorySaved[],
  payMethods: PayMethodSaved[],
  cycleOptions: Option[]
) => {
  const category = categories.find((c) => c.id === saved.categoryId);
  const payMethod = payMethods.find((p) => p.id === saved.paymentMethodId);
  const cycle = cycleOptions.find((l) => l.value === saved.cycle);

  return {
    ...saved,
    categoryName: category?.name,
    categoryEmoji: category?.emoji,
    categoryColor: category?.color,
    paymentMethodName: payMethod?.name,
    paymentMethodEmoji: payMethod?.emoji,
    cycleLabel: cycle?.label,
  };
};
