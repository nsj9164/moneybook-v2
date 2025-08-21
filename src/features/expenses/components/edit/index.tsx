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
import { useExpenseHandlers } from "../../hooks/useExpenseHandlers";
import {
  ExpenseEntity,
  ExpenseInsertDTO,
  ExpenseSaved,
  ExpenseUpdateDTO,
} from "@/types";
import { diffFields } from "@/utils/form";
import { toast } from "react-hot-toast";
import { calActualAmount } from "../../utils/expenseCalc";
import { TempId } from "@/types/ids";

const ExpenseFormPage = () => {
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const { userId } = useAuth();
  const setExpenses = useSetRecoilState(expensesState);
  const [newExpenses, setNewExpenses] = useState<ExpenseEntity[]>([]);
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

  const { handleSaveExpense, handleDeleteExpense } = useExpenseHandlers({
    userId: userId!,
    setExpenses,
  });

  const onSubmit = async () => {
    const saveData: (ExpenseInsertDTO | ExpenseUpdateDTO)[] = [];

    for (const newItem of newExpenses) {
      if (typeof newItem.id === "number" && editExpenses.length > 0) {
        const prev = editExpenses.find((e) => e.id === newItem.id);
        if (!prev) continue;

        const diffed = diffFields(prev, newItem);
        if (Object.keys(diffed).length === 0) {
          return;
        }

        saveData.push({ ...diffed, id: newItem.id });
      } else {
        const { id, ...insertData } = newItem;
        saveData.push(insertData as ExpenseInsertDTO);
      }
    }

    if (saveData.length === 0) {
      toast.error("저장할 변경 사항이 없습니다.");
      return;
    }

    await handleSaveExpense(saveData);
  };

  const handleSplitAmountChange = (id: number, peopleCnt: number) => {
    setNewExpenses((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              numberOfPeople: peopleCnt,
              actualAmount: calActualAmount(item.amount, peopleCnt),
            }
          : item
      )
    );
  };

  const handleUpdExpense = <K extends keyof ExpenseSaved>(
    value: ExpenseSaved[K],
    id: number | TempId,
    key: K
  ) => {
    setNewExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  // const isMobile = useMediaQuery("(max-width: 768px)");
  // const FormComponent = isMobile ? CardForm : TableForm;

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      {/* 헤더 영역 */}
      <EditHeader handleAddExpense={handleAddExpense} onSave={onSubmit} />

      {/* 데스크톱 뷰 - 테이블 형식 / 모바일 뷰 - 카드 형식*/}
      <TableForm
        editExpenses={editExpenses}
        categories={categories}
        payMethods={payMethods}
        onSave={onSubmit}
      />

      {/* 요약 정보 */}
      <EditSummary newExpenseCount={newExpenses.length} />

      {/* 하단 고정 저장 버튼 (모바일) */}
      {/* {isMobile && <AddExpenseMobileFooter />} */}
    </div>
  );
};

export default ExpenseFormPage;
