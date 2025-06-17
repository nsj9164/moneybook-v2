import { BudgetDisplay, UnBudgetDisplay } from "@/types";
import { useBudgetCategories } from "./useBudgetCategories";
import { useUnBudgetedCategories } from "./useUnBudgetCategories";

interface BudgetDataResult {
  budgets: BudgetDisplay[];
  unBudgets: UnBudgetDisplay[];
  refetchAll: () => Promise<void>;
}

interface BudgetCategoriesOptions {
  selectedDate: { year: number; month: number };
}

export const useBudgetData = ({
  selectedDate,
}: BudgetCategoriesOptions): BudgetDataResult => {
  const budget = useBudgetCategories({ selectedDate });
  const unbudget = useUnBudgetedCategories({ selectedDate });

  const refetchAll = async () => {
    await Promise.all([budget.refetch(), unbudget.refetch()]);
  };

  return {
    ...budget,
    ...unbudget,
    refetchAll,
  };
};
