import { ExpensesFilter } from "@/components/expenses/list/ExpensesFilter";
import { ExpensesFooter } from "@/components/expenses/list/ExpensesFooter";
import { ExpensesHeader } from "@/components/expenses/list/ExpensesHeader";
import { ExpensesListNoData } from "@/components/expenses/list/ExpensesListNoData";
import { ExpensesListTable } from "@/components/expenses/list/ExpensesListTable";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchExpenses } from "@/hooks/useFetchExpenses";
import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";
import { newExpensesState } from "@/recoil/atoms";
import { UUID } from "@/types/expense-types";
import { supabase } from "@/utils/supabase";
import { format, sub } from "date-fns";
import hangul from "hangul-js";
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
  console.log("expenses::::", expenses);

  const today = new Date();
  const subMonthToday = sub(today, { months: 1 });
  const initialFilters: IFilters = {
    itemName: "",
    categoryId: 0,
    payMethodId: 0,
    startDate: format(subMonthToday, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
  };
  const [filters, setFilters] = useState(initialFilters);

  // 초성 검색
  const matchHangul = (filterValue: string, itemValue: string) => {
    const filterHangul = hangul.disassemble(filterValue).join("");
    const itemHangul = hangul.disassemble(itemValue).join("");
    return itemHangul.includes(filterHangul);
  };

  // expenses에 검색 적용
  const filteredExpenses = expenses.filter((item) => {
    const isDateRange =
      item.date >= filters.startDate && item.date <= filters.endDate;

    const isCategoryMatch =
      filters.categoryId === 0 || filters.categoryId === item.categoryId;

    const isPayMethodMatch =
      filters.payMethodId === 0 || filters.payMethodId === item.paymentMethodId;

    const isItemNameMatch =
      filters.itemName === "" || matchHangul(filters.itemName, item.itemName);
    return (
      isDateRange && isCategoryMatch && isPayMethodMatch && isItemNameMatch
    );
  });

  // 검색
  const handleFiltersChange = (
    field: keyof typeof filters,
    value: string | number
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // 검색 초기화
  const resetFilters = () => {
    setFilters(initialFilters);
  };

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
        filters={filters}
        resetFilters={resetFilters}
        handleFiltersChange={handleFiltersChange}
      />

      {expenses.length > 0 ? (
        <ExpensesListTable
          expenses={filteredExpenses}
          chkList={chkList}
          chkListAll={chkListAll}
          handleCheck={handleCheck}
          handleCheckedAll={handleCheckedAll}
          filters={filters}
          resetFilters={resetFilters}
        />
      ) : (
        <ExpensesListNoData />
      )}

      <ExpensesFooter expenseCount={filteredExpenses.length} />
    </div>
  );
};

export default Expenses;
