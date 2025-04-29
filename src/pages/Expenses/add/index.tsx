import { ExpenseForm } from "@/components/expense-form";
import { IExpense } from "@/types/expense-types";
import { useEffect, useState } from "react";
import { AddExpenseHeader } from "./AddExpenseHeader";
import { AddExpenseMobileFooter } from "./AddExpenseMobileFooter";
import { AddExpenseSummary } from "./AddExpenseSummary";

const AddExpense = () => {
  const [newExpenses, setNewExpenses] = useState<IExpense[]>([]);

  const handleAddExpense = () => {
    const newItem: IExpense = {
      id: Date.now(),
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
    if (newExpenses.length === 0) handleAddExpense();
  }, [newExpenses]);

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      {/* 헤더 영역 */}
      <AddExpenseHeader handleAddExpense={handleAddExpense} />

      {/* 데스크톱 뷰 - 테이블 형식 / 모바일 뷰 - 카드 형식*/}
      <ExpenseForm newExpenses={newExpenses} setNewExpenses={setNewExpenses} />

      {/* 요약 정보 */}
      <AddExpenseSummary newExpenseCount={newExpenses.length} />

      {/* 하단 고정 저장 버튼 (모바일) */}
      {isMobile && <AddExpenseMobileFooter />}
    </div>
  );
};

export default AddExpense;
