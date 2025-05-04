import { useAuth } from "@/contexts/AuthContext";
import { expensesState } from "@/recoil/atoms";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const expenseKeys = [
  "id",
  "date",
  "item_name",
  "amount",
  "actual_amount",
  "note",
  "category_id",
  "payment_method_id",
];

export const useFetchExpenses = () => {
  const [expenses, setExpenses] = useRecoilState(expensesState);
  const { user } = useAuth();

  const joinColumns = ["categories(name)", "payment_methods(name)"];

  const selectColumns = [...expenseKeys, ...joinColumns].join(", ");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("expenses")
        .select(selectColumns)
        .eq("user_id", user?.id);

      if (error) console.error("Insert Error:", error.message);

      if (data) {
        console.log("Data::::", data);
        const mappedData = formatKeyCase(data, "camel");
        setExpenses(mappedData ?? []);
      }
    };

    fetchData();
  }, []);

  return expenses;
};
