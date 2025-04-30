import { useAuth } from "@/contexts/AuthContext";
import { payMethodsState } from "@/recoil/atoms";
import { keysToCamelCase } from "@/utils/caseConverter";
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
        .select(
          `id, method_name, payment_alias, billing_start_day, billing_end_day, type_id`
        )
        .eq("user_id", user?.id);

      if (data && !error) {
        const mappedData = keysToCamelCase(data);
        setPayMethods(mappedData ?? []);
      }
    };

    fetchData();
  }, []);

  return payMethods;
};
