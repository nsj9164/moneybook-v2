import { ExpenseForm } from "@/components/expenses/edit/expense-form";
import { useAuth } from "@/contexts/AuthContext";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { expenseKeys } from "@/hooks/useFetchExpenses";
import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";
import { IExpense } from "@/types/expense-types";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { newExpensesState } from "@/recoil/atoms";
import { EditHeader } from "./EditHeader";
import { EditSummary } from "./EditSummary";

const ExpenseFormPage = () => {
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const { user } = useAuth();
  const [newExpenses, setNewExpenses] = useRecoilState(newExpensesState);

  // newExpenses add
  const handleAddExpense = () => {
    const newItem: IExpense = {
      id: uuidv4(),
      date: new Date().toISOString().slice(0, 10),
      itemName: "",
      amount: 0,
      actualAmount: 0,
      note: "",
      paymentMethodId: 0,
      categoryId: 0,
      isDifferentAmount: false,
    };
    setNewExpenses((prev) => [...prev, newItem]);
  };

  useEffect(() => {
    console.log("😀newExpenses:::", newExpenses);
    if (newExpenses.length === 0) handleAddExpense();
  }, [newExpenses]);

  // newExpenses_지정한 key만 반환
  const pickOnly = (obj: Record<string, any>, keys: string[]) =>
    Object.fromEntries(keys.map((key) => [key, obj[key]]));

  // newExpenses_저장 형식에 맞게 가공
  const formatExpenseForInsert = (item: IExpense) => {
    const snakeCase = formatKeyCase(item, "snake");
    const filtered = pickOnly(snakeCase, expenseKeys);

    return { ...filtered, user_id: user?.id };
  };

  // newExpenses save
  const handleSaveExpense = async () => {
    if (newExpenses.length < 1) {
      return;
    }
    console.log("newExpenses:::", newExpenses);

    const saveData = newExpenses
      .filter((expense) => expense.isModified)
      .map((item) => formatExpenseForInsert(item));

    console.log("saveData::::", saveData);

    const { error } = await supabase.from("expenses").upsert(saveData).select();

    if (error) {
      console.error("Insert error:", error.message);
      return;
    }

    setNewExpenses([]);
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      {/* 헤더 영역 */}
      <EditHeader
        handleAddExpense={handleAddExpense}
        handleSaveExpense={handleSaveExpense}
      />

      {/* 데스크톱 뷰 - 테이블 형식 / 모바일 뷰 - 카드 형식*/}
      <ExpenseForm
        newExpenses={newExpenses}
        setNewExpenses={setNewExpenses}
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
