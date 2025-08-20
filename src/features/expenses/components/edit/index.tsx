import { useAuth } from "@/contexts/AuthContext";
import { useFetchCategories } from "@/hooks/fetchData/useFetchCategories";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { EditHeader } from "./EditHeader";
import { EditSummary } from "./EditSummary";
import { useFetchPayMethods } from "@/hooks/fetchData/useFetchPayMethods";
import { initialExpense } from "../../constants/expense.initial";
import { expensesState } from "@/recoil/atoms";
import { useSearchParams } from "react-router-dom";
import { useFetchExpensesByIds } from "@/hooks/fetchData/useFetchExpensesByIds";
import { TableForm } from "./expense-form/table-form";

const ExpenseFormPage = () => {
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const { userId } = useAuth();
  const setExpenses = useSetRecoilState(expensesState);
  const [newExpenses, setNewExpenses] = useState([{}]);
  // newExpenses add
  const handleAddExpense = () => {
    setNewExpenses((prev) => [...prev, initialExpense]);
  };

  useEffect(() => {
    if (newExpenses.length === 0) handleAddExpense();
  }, [newExpenses]);

  const [searchParams] = useSearchParams();
  const ids = searchParams.get("ids")?.split(",").map(Number) || [];
  const editExpenses = useFetchExpensesByIds(ids);

  // const onSubmit = async () => {
  //   const prevItems = prevDataRef.current.items;

  //   const prevById = new Map<number, ExpenseSaved>(
  //     prevItems.filter(isSaved).map((p) => [p.id, p])
  //   );
  // };

  // const handleSaveExpense = async () => {
  //   if (newExpenses.length < 1) {
  //     return;
  //   }

  //   const saveData = newExpenses
  //     .filter((expense) => expense.isModified)
  //     .map((item) => formatExpenseForInsert(item));

  //   const { error } = await supabase.from("expenses").upsert(saveData).select();

  //   if (error) {
  //     console.error("Insert error:", error.message);
  //     return;
  //   }

  //   setNewExpenses([]);
  // };

  // const isMobile = useMediaQuery("(max-width: 768px)");
  // const FormComponent = isMobile ? CardForm : TableForm;

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      {/* 헤더 영역 */}
      <EditHeader
        handleAddExpense={handleAddExpense}
        handleSaveExpense={handleSaveExpense}
      />

      {/* 데스크톱 뷰 - 테이블 형식 / 모바일 뷰 - 카드 형식*/}
      <TableForm
        editExpenses={editExpenses}
        categories={categories}
        payMethods={payMethods}
      />

      {/* 요약 정보 */}
      <EditSummary newExpenseCount={newExpenses.length} />

      {/* 하단 고정 저장 버튼 (모바일) */}
      {/* {isMobile && <AddExpenseMobileFooter />} */}
    </div>
  );
};

export default ExpenseFormPage;
