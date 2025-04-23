import { ArrowLeft, Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import AddExpenseDesktop from "./AddExpenseDesktop";
import { AddExpenseHeader } from "./AddExpenseHeader";
import AddExpenseMobile from "./AddExpenseMobile";
import { AddExpenseSummary } from "./AddExpenseSummary";

export interface IExpenses {
  id: number;
  date: string;
  itemName: string;
  amount: number;
  actualAmount: number;
  note: string;
  paymentMethodId: number;
  categoryId: number;
  isDifferentAmount: false;
}

const AddExpense = () => {
  // 퍼블리싱 목적으로 정적 데이터 사용
  const [newExpenses, setNewExpenses] = useState<IExpenses[]>([]);
  const isMobile = window.innerWidth < 768;

  const handleAddExpense = () => {
    const newItem: IExpenses = {
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

  const handleDelNewExpense = (id: number) => {
    setNewExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (newExpenses.length === 0) handleAddExpense();
  }, [newExpenses]);

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      {/* 헤더 영역 */}
      <AddExpenseHeader handleAddExpense={handleAddExpense} />

      {/* 데스크톱 뷰 - 테이블 형식 / 모바일 뷰 - 카드 형식*/}
      {isMobile ? (
        <AddExpenseMobile />
      ) : (
        <AddExpenseDesktop
          newExpenses={newExpenses}
          handleDelNewExpense={handleDelNewExpense}
        />
      )}

      {/* 요약 정보 */}
      <AddExpenseSummary newExpenseCount={newExpenses.length} />

      {/* 하단 고정 저장 버튼 (모바일) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            <Save className="mr-2 -ml-1 h-4 w-4" />
            모두 저장 ({newExpenses.length}개)
          </button>
        </div>
      )}
    </div>
  );
};

export default AddExpense;
