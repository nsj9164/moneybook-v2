import { BudgetEntity, BudgetId } from "@/types";
import { nanoid } from "nanoid";

export const adviceStyleMap = {
  normal: {
    textColor: "text-emerald-600",
    titleColor: "text-emerald-800",
    descColor: "text-emerald-700",
  },
  warning: {
    textColor: "text-yellow-600",
    titleColor: "text-yellow-800",
    descColor: "text-yellow-700",
  },
  danger: {
    textColor: "text-red-600",
    titleColor: "text-red-800",
    descColor: "text-red-700",
  },
} as const;

export type AdviceType = keyof typeof adviceStyleMap;

export const createTempBudgetId = (): BudgetId => `temp_${nanoid()}`;

export const initialBudget = (): BudgetEntity => ({
  id: createTempBudgetId(),
  categoryId: undefined,
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  amount: 0,
});
