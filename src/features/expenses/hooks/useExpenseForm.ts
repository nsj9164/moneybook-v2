import { useState } from "react";
import { TempId } from "@/types/ids";
import {
  ExpenseEntity,
  ExpenseInsertDTO,
  ExpenseSaved,
  ExpenseUpdateDTO,
} from "@/types";
import { diffFields } from "@/utils/form";
import { parseCurrency } from "@/utils/format";
import { toast } from "react-hot-toast";
import { calActualAmount } from "../utils/expenseCalc";

export function useExpenseForm(params: {
  editExpenses: ExpenseSaved[];
  handleSaveExpense: (
    data: (ExpenseInsertDTO | ExpenseUpdateDTO)[]
  ) => Promise<void>;
  handleDeleteExpense: (id: number) => Promise<void>;
}) {
  const { editExpenses, handleSaveExpense, handleDeleteExpense } = params;
  const [newExpenses, setNewExpenses] = useState<ExpenseEntity[]>([]);

  // 추가
  const addExpense = (expense: ExpenseEntity) => {
    setNewExpenses((prev) => [...prev, expense]);
  };

  // 수정
  const updateExpense = <K extends keyof ExpenseSaved>(
    value: ExpenseSaved[K],
    id: number | TempId,
    key: K
  ) => {
    setNewExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  // 삭제
  const deleteExpense = async (id: number | TempId) => {
    if (typeof id === "number") {
      await handleDeleteExpense(id);
    } else {
      setNewExpenses((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 더치페이 금액 계산
  const splitAmount = (id: number | TempId, peopleCnt: number) => {
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

  // update 실지출금액
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

  // 저장
  const submit = async () => {
    const saveData: (ExpenseInsertDTO | ExpenseUpdateDTO)[] = [];

    for (const newItem of newExpenses) {
      if (typeof newItem.id === "number") {
        const prev = editExpenses.find((e) => e.id === newItem.id);
        if (!prev) continue;

        const diffed = diffFields(prev, newItem);
        if (Object.keys(diffed).length === 0) continue;

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

  return {
    newExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    splitAmount,
    updateActualAmount,
    submit,
  };
}
