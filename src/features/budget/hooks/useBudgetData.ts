import {
  BudgetCategoriesOptions,
  BudgetDisplay,
  UnBudgetDisplay,
} from "@/types";
import { useBudgetCategories } from "./useBudgetCategories";
import { useUnBudgetedCategories } from "./useUnBudgetCategories";

type Result = {
  budgets: BudgetDisplay[];
  unBudgets: UnBudgetDisplay[];
  loading: boolean;
  fetching: boolean;
  error: Error | null;
  refetchAll: () => Promise<void>;
  refetchBudgets: () => Promise<any>;
  refetchUnBudgets: () => Promise<any>;
};

export const useBudgetData = ({
  selectedDate,
}: BudgetCategoriesOptions): Result => {
  const b = useBudgetCategories({ selectedDate });
  const u = useUnBudgetedCategories({ selectedDate });

  const refetchAll = async () => {
    await Promise.all([b.refetch(), u.refetch()]);
  };

  return {
    budgets: b.budgets,
    unBudgets: u.unBudgets,
    loading: b.loading || u.loading,
    fetching: b.fetching || u.fetching,
    error: (b.error as Error | null) ?? (u.error as Error | null) ?? null,
    refetchAll,
    refetchBudgets: b.refetch,
    refetchUnBudgets: u.refetch,
  };
};
