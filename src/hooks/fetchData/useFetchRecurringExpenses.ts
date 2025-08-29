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
        .from("recurring_expenses_with_label")
        .select("*")
        .eq("user_id", userId)
        .order("id");

      if (error) console.error("Fetch Error:", error.message);

      if (data && data.length > 0) {
        const mappedData = formatKeyCase(data, "camel");
        setRecurrings(mappedData ?? []);
      }
    };

    fetchData();
  }, []);

  return recurrings;
};
