import { YearMonth } from "@/types/common";
import { BudgetDisplay } from "../types/budget.display";
import { useBudgetCategories } from "./useBudgetCategories";
import { useUnBudgetedCategories } from "./useUnBudgetCategories";

type Result = {
  budgets: BudgetDisplay[];
  unBudgets: BudgetDisplay[];
  loading: boolean;
  fetching: boolean;
  error: Error | null;
  refetchAll: () => Promise<void>;
  refetchBudgets: () => Promise<any>;
  refetchUnBudgets: () => Promise<any>;
};

export const useBudgetData = ({
  targetDate,
}: {
  targetDate: string;
}): Result => {
  const b = useBudgetCategories({ targetDate });
  const u = useUnBudgetedCategories({ targetDate });

  const refetchAll = async () => {
    await Promise.all([b.refetch(), u.refetch()]);
  };

  console.log("budget???", b);
  console.log("unbudget???", u);

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
