import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export const useFetchRpc = <T>(
  rpcName: string,
  targetDate: string,
  userId: UUID,
  extraParams: Record<string, any> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = {
        input_target_date: targetDate,
        input_user_id: userId,
        ...extraParams,
      };

      const { data, error } = await supabase.rpc(rpcName, params);

      if (error || !data) {
        setError(error || new Error("No Data"));
        setData(null);
        setLoading(false);
        return;
      }

      setData(formatKeyCase(data, "camel"));
      setLoading(false);
    };

    fetchData();
  }, [rpcName, targetDate, userId, JSON.stringify(extraParams)]);

  return data;
};
