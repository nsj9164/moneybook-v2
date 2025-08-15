import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFetchRpcQuery } from "@/hooks/fetchData/useFetchRpcQuery";
import { BudgetDisplay } from "../types/budget.display";
import { YearMonth } from "@/types/common";

export const useBudgetCategories = ({ selectedDate }: YearMonth) => {
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
