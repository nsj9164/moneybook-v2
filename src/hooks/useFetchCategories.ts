import { useAuth } from "@/contexts/AuthContext";
import { categoriesState } from "@/recoil/atoms";
import { keysToCamelCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const useFetchExpenses = () => {
  const setCategories = useSetRecoilState(categoriesState);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select(`id, name, parent_id, target_amount, transaction_type`)
        .eq("user_id", user?.id);

      if (data && !error) {
        const mappedData = keysToCamelCase(data);
        setCategories(mappedData ?? []);
      }
    };

    fetchData();
  }, []);
};
