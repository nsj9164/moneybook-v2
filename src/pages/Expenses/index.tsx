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
  const [chkListAll, setChkListAll] = useState<boolean>(false);

  useEffect(() => {
    console.log("chkList::::", chkList);
  }, [chkList]);

  // delete Expenses
  const handleDelExpenses = async () => {
    if (chkList.length < 1) return;
    console.log("chkList::::", chkList);
    const { error } = await supabase
      .from("expenses")
      .delete()
      .in("id", chkList);
  };

  // select expenses-item
  const handleCheck = (id: UUID) => {
    setChkList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 전체선택/해제
  const handleCheckedAll = () => {
    const newState = !chkListAll;
    setChkListAll(newState);
    if (newState) {
      const all = expenses.map((i) => i.id);
      setChkList(all);
    } else {
      setChkList([]);
    }
  };

  // chkList에 따른 setChkListAll
  useEffect(() => {
    if (expenses.length > 0 && chkList.length === expenses.length)
      !chkListAll && setChkListAll(true);
    else chkListAll && setChkListAll(false);
  }, [chkList, expenses]);

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <ExpensesHeader
        chkListCnt={chkList.length}
        handleDelExpenses={handleDelExpenses}
      />
      <ExpensesFilter categories={categories} payMethods={payMethods} />
      <ExpensesListTable
        expenses={expenses}
        chkList={chkList}
        chkListAll={chkListAll}
        handleCheck={handleCheck}
        handleCheckedAll={handleCheckedAll}
      />
      <ExpensesFooter expenseCount={expenses.length} />
    </div>
  );
};

export default Expenses;
