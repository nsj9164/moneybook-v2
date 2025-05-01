import { useAuth } from "@/contexts/AuthContext";
import { categoriesState } from "@/recoil/atoms";
import { keysToCamelCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useFetchCategories = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { user } = useAuth();
  console.log("userID!!!!!!!!!!!!!!!!!", user?.id);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select(`id, name, target_amount, transaction_type`)
        .eq("user_id", user?.id);

      if (data && !error) {
        const mappedData = keysToCamelCase(data);
        setCategories(mappedData ?? []);
      }
    };

    fetchData();
  }, []);

  return categories;
};
