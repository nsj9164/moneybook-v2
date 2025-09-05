import { useAuth } from "@/contexts/AuthContext";
import { transactionsState } from "@/recoil/atoms";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const expenseKeys = [
  "id",
  "date",
  "item_name",
  "amount",
  "actual_amount",
  "note",
  "category_id",
  "payment_method_id",
  "recurring_expense_id",
];

export const useFetchExpenses = () => {
  const [transactions, setTransactions] = useRecoilState(transactionsState);
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const joinColumns = ["categories(name)", "payment_methods(name)"];
  const selectColumns = [...expenseKeys, ...joinColumns].join(", ");

  const fetchData = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("expenses")
      .select(selectColumns)
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) {
      console.error("Fetch Error:", error.message);
      setError(error.message);
    }

    if (data && data.length > 0) {
      const mappedData = formatKeyCase(data, "camel");
      setTransactions(mappedData ?? []);
    }

    setLoading(false);
  }, [userId, selectColumns, setTransactions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { transactions, loading, error, refetch: fetchData };
};
