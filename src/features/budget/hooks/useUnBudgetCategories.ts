import { useAuth } from "@/contexts/AuthContext";
import { useFetchRpcQuery } from "@/hooks/fetchData/useFetchRpcQuery";
import { BudgetDisplay } from "../types/budget.display";

export const useUnBudgetedCategories = ({
  targetDate,
}: {
  targetDate: string;
}) => {
  const { userId } = useAuth();

  const query = useFetchRpcQuery<BudgetDisplay[]>(
    "get_unbudgeted_categories_by_date",
    targetDate,
    userId!
  );

  return {
    unBudgets: query.data ?? [],
    loading: query.isLoading,
    fetching: query.isFetching,
    refetch: query.refetch,
    error: query.error,
  };
};
