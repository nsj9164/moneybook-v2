import { useAuth } from "@/contexts/AuthContext";
import { expensesState } from "@/recoil/atoms";
import { formatExpense } from "@/utils/formatExpense";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const useFetchExpenses = () => {
  const setExpenses = useSetRecoilState(expensesState);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("expenses")
        .select(
          `
        id, date, item_name, amount, actual_amount, note, categories(name), payment_methods(method_name)
        `
        )
        .eq("user_id", user?.id);

      const mappedData = data?.map(formatExpense);

      if (!error && data) setExpenses(mappedData ?? []);
    };

    fetchData();
  }, []);
};
