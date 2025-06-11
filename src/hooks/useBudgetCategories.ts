import { budgetState } from "@/recoil/atoms";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useRecoilState } from "recoil";
import { useEffect, useState, useCallback } from "react";

interface useBudgetCategoriesOptions {
  startDate: string;
  endDate: string;
}

export const useBudgetCategories = ({
  startDate,
  endDate,
}: useBudgetCategoriesOptions) => {
  const [categories, setCategories] = useRecoilState(budgetState);
  const [loading, setLoading] = useState(true);

  const fetchBudgetCategories = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc(
      "get_category_summary_by_date_range",
      {
        start_date: startDate,
        end_date: endDate,
      }
    );

    if (error) {
      console.error("fetch error: ", error.message);
      setLoading(false);
      return;
    }

    if (data) {
      setCategories(formatKeyCase(data, "camel"));
    }
    setLoading(false);
  }, [startDate, endDate, setCategories]);

  useEffect(() => {
    fetchBudgetCategories();
  }, [fetchBudgetCategories]);

  return { categories, loading, refetch: fetchBudgetCategories };
};
