import { createTempEntityId } from "@/types/ids";
import { BudgetEntity } from "../types/budget.entity";

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

export const initialBudget = (now = new Date()): BudgetEntity => ({
  id: createTempEntityId(),
  categoryId: 0,
  year: now.getFullYear(),
  month: now.getMonth() + 1,
  amount: 0,
});
