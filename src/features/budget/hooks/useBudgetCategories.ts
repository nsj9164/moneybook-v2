import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { BudgetCategoriesOptions, BudgetDisplay } from "@/types";
import { useFetchRpcQuery } from "@/hooks/fetchData/useFetchRpcQuery";

export const useBudgetCategories = ({
  selectedDate,
}: BudgetCategoriesOptions) => {
  const { userId } = useAuth();

  const targetDate = useMemo(
    () => `${selectedDate.year}-${String(selectedDate.month).padStart(2, "0")}`,
    [selectedDate.year, selectedDate.month]
  );

  const query = useFetchRpcQuery<BudgetDisplay[]>(
    "get_budget_summary_by_date",
    targetDate,
    userId!
  );

  return {
    budgets: query.data ?? [],
    loading: query.isLoading,
    fetching: query.isFetching,
    refetch: query.refetch,
    error: query.error,
  };
};
