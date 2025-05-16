import { ExpensesFilter } from "@/components/expenses/list/ExpensesFilter";
import { ExpensesFooter } from "@/components/expenses/list/ExpensesFooter";
import { ExpensesHeader } from "@/components/expenses/list/ExpensesHeader";
import { ExpensesListTable } from "@/components/expenses/list/ExpensesListTable";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchExpenses } from "@/hooks/useFetchExpenses";
import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";
import { newExpensesState } from "@/recoil/atoms";
import { UUID } from "@/types/expense-types";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

export type IFilters = {
  itemName: string;
  categoryId: number;
  payMethodId: number;
  startDate: string;
  endDate: string;
};

const Expenses = () => {
  const expenses = useFetchExpenses();
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();

  const [chkList, setChkList] = useState<UUID[]>([]);
  const [chkListAll, setChkListAll] = useState<boolean>(false);
  const setNewExpenses = useSetRecoilState(newExpensesState);
  const navigate = useNavigate();

  const initialFilters: IFilters = {
    itemName: "",
    categoryId: 0,
    payMethodId: 0,
    startDate: "",
    endDate: "",
  };
  const [filters, setFilters] = useState(initialFilters);

  const matchWithOptional = (filterValue: number, itemValue: number) =>
    filterValue !== 0 && filterValue === itemValue;

  const filteredExpenses = expenses.filter((item) => {
    return (
      item.date >= filters.startDate &&
      item.date <= filters.endDate &&
      matchWithOptional(filters.categoryId, item.categoryId) &&
      matchWithOptional(filters.payMethodId, item.paymentMethodId) &&
      (filters.itemName === "" || item.itemName.includes(filters.itemName))
    );
  });

  // delete Expenses
  const handleDelExpenses = async () => {
    if (chkList.length < 1) return;
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
      const all = filteredExpenses.map((i) => i.id);
      setChkList(all);
    } else {
      setChkList([]);
    }
  };

  // chkList에 따른 setChkListAll
  useEffect(() => {
    if (
      filteredExpenses.length > 0 &&
      chkList.length === filteredExpenses.length
    )
      !chkListAll && setChkListAll(true);
    else chkListAll && setChkListAll(false);
  }, [chkList, filteredExpenses]);

  // 수정할 data 세팅 + 수정페이지 이동
  const setEditData = () => {
    const editData = filteredExpenses.filter((item) =>
      chkList.includes(item.id)
    );
    if (editData.length === 0) return;
    setNewExpenses(editData);
    navigate("/expenses/edit");
  };

  // 검색 초기화
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // 검색
  const handleFiltersChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <ExpensesHeader
        chkListCnt={chkList.length}
        handleDelExpenses={handleDelExpenses}
        setEditData={setEditData}
      />
      <ExpensesFilter
        categories={categories}
        payMethods={payMethods}
        resetFilters={resetFilters}
        handleFiltersChange={handleFiltersChange}
      />
      <ExpensesListTable
        expenses={filteredExpenses}
        chkList={chkList}
        chkListAll={chkListAll}
        handleCheck={handleCheck}
        handleCheckedAll={handleCheckedAll}
      />
      <ExpensesFooter expenseCount={filteredExpenses.length} />
    </div>
  );
};

export default Expenses;
