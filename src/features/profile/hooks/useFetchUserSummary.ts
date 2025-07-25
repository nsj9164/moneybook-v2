import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { UserTotalSummary } from "../types/TotalSummary";

export const useFetchUserSummary = ({ userId }: { userId: UUID }) => {
  const [data, setData] = useState<UserTotalSummary | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.rpc("get_total_expense_summary", {
        input_user_id: userId,
      });

      if (error) {
        console.error("Fetch Total Expense Summary Error:", error.message);
        setData(null);
        return;
      }

      setData(formatKeyCase(data, "camel"));
    };

    if (userId) fetchData();
  }, [userId]);

  return data;
};
