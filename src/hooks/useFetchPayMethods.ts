import { useAuth } from "@/contexts/AuthContext";
import { payMethodsState } from "@/recoil/atoms";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useFetchPayMethods = () => {
  const [payMethods, setPayMethods] = useRecoilState(payMethodsState);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("payment_methods")
        .select(`id, name, billing_start_day, billing_end_day, type_id, emoji`)
        .eq("user_id", user?.id);

      if (error) console.error("Insert Error:", error.message);

      if (data) {
        const mappedData = formatKeyCase(data, "camel");
        setPayMethods(mappedData ?? []);
      }
    };

    fetchData();
  }, []);

  return payMethods;
};
