import { useAuth } from "@/contexts/AuthContext";
import { initialExpense } from "@/features/expenses/constants/expense.initial";
import { useExpenseForm } from "@/features/expenses/hooks/useExpenseForm";
import { useExpenseHandlers } from "@/features/expenses/hooks/useExpenseHandlers";
import { ExpenseFormContextType } from "@/features/expenses/types/ExpenseFormContextType";
import { calActualAmount } from "@/features/expenses/utils/expenseCalc";
import { useFetchExpensesByIds } from "@/hooks/fetchData/useFetchExpensesByIds";
import { expensesState } from "@/recoil/atoms";
import {
  ExpenseEntity,
  ExpenseInsertDTO,
  ExpenseSaved,
  ExpenseUpdateDTO,
} from "@/types";
import { TempId } from "@/types/ids";
import { diffFields } from "@/utils/form";
import { parseCurrency } from "@/utils/format";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const ExpenseFormContext = createContext<ExpenseFormContextType | null>(null);

export const ExpenseFormProvider = ({
  children,
  editExpenses,
}: { children: React.ReactNode; editExpenses: ExpenseSaved[] } & Parameters<
  typeof useExpenseForm
>[0]) => {
  const { userId } = useAuth();
  const setExpenses = useSetRecoilState(expensesState);
  const [newExpenses, setNewExpenses] = useState<ExpenseEntity[]>([]);

  const { handleSaveExpense, handleDeleteExpense } = useExpenseHandlers({
    userId: userId!,
    setExpenses,
  });

  const handleAddExpense = () => {
    setNewExpenses((prev) => [...prev, initialExpense]);
  };

  const onSave = async () => {
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

  function isTempId(id: number | TempId): id is TempId {
    return typeof id !== "number";
  }

  const onDelete = async (id: number | TempId) => {
    if (isTempId(id)) {
      setNewExpenses((prev) => prev.filter((item) => item.id !== id));
    } else {
      await handleDeleteExpense(id);
    }
  };

  const handleSplitAmountChange = (id: number | TempId, peopleCnt: number) => {
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

  const onUpdate = <K extends keyof ExpenseSaved>(
    value: ExpenseSaved[K],
    id: number | TempId,
    key: K
  ) => {
    setNewExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  // 실제지출 - 결제금액 변경 적용
  const updateActualAmount = (
    amount: string,
    id: number,
    peopleCnt: number
  ) => {
    const newActualAmount =
      peopleCnt > 0
        ? calActualAmount(parseCurrency(amount), peopleCnt)
        : parseCurrency(amount);

    setNewExpenses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, actualAmount: newActualAmount } : item
      )
    );
  };

  return (
    <ExpenseFormContext.Provider
      value={{
        newExpenses,
        handleAddExpense,
        handleSplitAmountChange,
        onUpdate,
        updateActualAmount,
        onSave,
        onDelete,
      }}
    >
      {children}
    </ExpenseFormContext.Provider>
  );
};

export const useExpenseFormContext = () => {
  const ctx = useContext(ExpenseFormContext);
  if (!ctx)
    throw new Error(
      "useExpenseFormContext must be used inside ExpenseFormProvider"
    );
  return ctx;
};
