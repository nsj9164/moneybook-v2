import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useFetchRpcQuery = <T>(
  rpcName: string,
  targetDate: string,
  userId: UUID,
  extraParams: Record<string, unknown> = {}
) => {
  return useQuery<T, Error, T>({
    queryKey: [rpcName, targetDate, userId, JSON.stringify(extraParams)],
    queryFn: async () => {
      if (!userId || !targetDate) throw new Error("Invalid params");

      const params = {
        input_target_date: targetDate,
        input_user_id: userId,
        ...extraParams,
      };

      const { data, error } = await supabase.rpc(rpcName, params);

      if (error || !data) {
        throw error || new Error("No data returned");
      }

      return formatKeyCase(data ?? ["앙"], "camel") as T;
    },
    enabled: Boolean(userId && targetDate),
    staleTime: 1000 * 60 * 60,
    gcTime: Infinity,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
