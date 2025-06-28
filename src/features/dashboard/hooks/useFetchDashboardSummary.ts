import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

interface DashboardSummaryProps {
  userId: UUID;
  targetDate: Date;
}

export const useFetchDashboardSummary = ({
  userId,
  targetDate,
}: DashboardSummaryProps) => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_dashboard_summary", {
        user_id: userId,
        target_date: targetDate,
      });

      if (error || !data) console.log("Fetch Dashboard Summary Error:", error);

      if (data) {
        const mappedData = formatKeyCase(data, "camel");
        setSummaryData(mappedData ?? []);
      }
    };

    fetchSummaryData();
  }, []);

  return summaryData;
};
