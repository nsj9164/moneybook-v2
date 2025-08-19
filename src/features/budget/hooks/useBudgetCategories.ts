import { useAuth } from "@/contexts/AuthContext";
import { useFetchRpcQuery } from "@/hooks/fetchData/useFetchRpcQuery";
import { BudgetDisplay } from "../types";

export const useBudgetCategories = ({ targetDate }: { targetDate: string }) => {
  const { userId } = useAuth();

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
