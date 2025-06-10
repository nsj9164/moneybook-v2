import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export const useFirstExpenseYear = () => {
  const { userId } = useAuth();
  return useQuery<number | null>({
    queryKey: ["firstExpenseYear", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expenses")
        .select("date")
        .eq("user_id", userId)
        .order("date", { ascending: true })
        .limit(1)
        .single();

      if (error) throw error;
      return data.date ? new Date(data.date).getFullYear() : null;
    },
    staleTime: 1000 * 60 * 10,
  });
};
