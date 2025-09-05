import { useAuth } from "@/contexts/AuthContext";
import { TransactionSaved } from "@/types";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

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

export const useFetchExpensesByIds = (ids: number[]) => {
  const [data, setData] = useState<TransactionSaved[]>([]);
  const { userId } = useAuth();

  const joinColumns = ["categories(name)", "payment_methods(name)"];

  const selectColumns = [...expenseKeys, ...joinColumns].join(", ");

  useEffect(() => {
    if (!userId || ids.length === 0) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("expenses")
        .select(selectColumns)
        .eq("user_id", userId)
        .in("id", ids);

      if (error) {
        console.error("Fetch Error:", error.message);
        return;
      }

      setData(formatKeyCase(data, "camel") ?? []);
    };

    fetchData();
  }, []);

  return data;
};
