import { ExpensesFilter } from "@/components/expenses/list/ExpensesFilter";
import { ExpensesFooter } from "@/components/expenses/list/ExpensesFooter";
import { ExpensesHeader } from "@/components/expenses/list/ExpensesHeader";
import { ExpensesListTable } from "@/components/expenses/list/ExpensesListTable";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchExpenses } from "@/hooks/useFetchExpenses";
import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";
import { UUID } from "@/types/expense-types";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

const Expenses = () => {
  const expenses = useFetchExpenses();
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();

  const [chkList, setChkList] = useState<UUID[]>([]);

  useEffect(() => {
    console.log("chkList::::", chkList);
  }, [chkList]);

  const handleDelExpenses = async () => {
    if (chkList.length < 1) return;
    console.log("chkList::::", chkList);
    const { error } = await supabase
      .from("expenses")
      .delete()
      .in("id", chkList);
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <ExpensesHeader
        chkListCnt={chkList.length}
        handleDelExpenses={handleDelExpenses}
      />
      <ExpensesFilter categories={categories} payMethods={payMethods} />
      <ExpensesListTable expenses={expenses} setChkList={setChkList} />
      <ExpensesFooter expenseCount={expenses.length} />
    </div>
  );
};

export default Expenses;
