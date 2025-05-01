import { ExpenseForm } from "@/components/expense-form";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";
import { IExpense } from "@/types/expense-types";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { AddExpenseHeader } from "./AddExpenseHeader";
import { AddExpenseSummary } from "./AddExpenseSummary";

const AddExpense = () => {
  const [newExpenses, setNewExpenses] = useState<IExpense[]>([]);
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();

  // 지출 추가
  const handleAddExpense = () => {
    const newItem: IExpense = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      itemName: "",
      amount: "0",
      actualAmount: "0",
      note: "",
      paymentMethodId: 0,
      categoryId: 0,
      isDifferentAmount: false,
    };
    setNewExpenses((prev) => [...prev, newItem]);
  };

  useEffect(() => {
    if (newExpenses.length === 0) handleAddExpense();
  }, [newExpenses]);

  // 지출 저장
  const handleSaveExpense = async () => {
    const saveData = newExpenses.filter((item) => item.isModified);

    if (saveData.length > 0) {
      const { error } = await supabase.from("expenses").insert({ ...saveData });

      if (error) console.error("Insert error:", error.message);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      {/* 헤더 영역 */}
      <AddExpenseHeader
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
      <AddExpenseSummary newExpenseCount={newExpenses.length} />

      {/* 하단 고정 저장 버튼 (모바일) */}
      {/* {isMobile && <AddExpenseMobileFooter />} */}
    </div>
  );
};

export default AddExpense;
