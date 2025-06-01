import { useAuth } from "@/contexts/AuthContext";
import { recurringState } from "@/recoil/atoms";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useFetchRecurringExpenses = () => {
  const [recurrings, setRecurrings] = useRecoilState(recurringState);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("recurring_expenses")
        .select(
          `id, name, amount, cycle, billing_start_day, billing_end_day, next_payment_date, payent_method_id, categories(name) payment_methods(name), is_active`
        )
        .eq("user_id", userId)
        .order("id");

      if (error) console.error("Fetch Error:", error.message);

      if (data) {
        const mappedData = formatKeyCase(data, "camel");
        setRecurrings(mappedData ?? []);
      }
    };

    fetchData();
  }, []);

  return recurrings;
};
