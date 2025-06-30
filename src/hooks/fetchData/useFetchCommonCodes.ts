import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useFetchCommonCodes = (group_code: string) => {
  return useQuery({
    queryKey: ["commonCodes", group_code],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("common_codes")
        .select("id, code_value, code_name")
        .eq("group_code", group_code);

      if (error) console.error("Fetch Error:", error.message);
      return formatKeyCase(data, "camel");
    },
  });
};
