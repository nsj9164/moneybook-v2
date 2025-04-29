import { useAuth } from "@/contexts/AuthContext";
import { paymentMethodsState } from "@/recoil/atoms";
import { keysToCamelCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const useFetchPaymentMethod = () => {
  const setPaymentMethods = useSetRecoilState(paymentMethodsState);
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
        setPaymentMethods(mappedData ?? []);
      }
    };

    fetchData();
  }, []);
};
