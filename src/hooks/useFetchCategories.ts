import { useAuth } from "@/contexts/AuthContext";
import { categoriesState } from "@/recoil/atoms";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useFetchCategories = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select(
          `id, name, target_amount, transaction_type, emoji, color, default_yn`
        )
        .eq("user_id", user?.id)
        .order("id");

      if (error) console.error("Insert Error:", error.message);

      if (data) {
        const mappedData = formatKeyCase(data, "camel");
        setCategories(mappedData ?? []);
      }
    };

    fetchData();
  }, []);

  return categories;
};
