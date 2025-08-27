import { useAuth } from "@/contexts/AuthContext";
import { createInitialExpense } from "@/features/expenses/constants/expense.initial";
import { useExpenseHandlers } from "@/features/expenses/hooks/useExpenseHandlers";
import { ExpenseFormContextType } from "@/features/expenses/types/ExpenseFormContextType";
import { calActualAmount } from "@/features/expenses/utils/expenseCalc";
import { useFetchCategories } from "@/hooks/fetchData/useFetchCategories";
import { useFetchExpensesByIds } from "@/hooks/fetchData/useFetchExpensesByIds";
import { useFetchPayMethods } from "@/hooks/fetchData/useFetchPayMethods";
import { expensesState } from "@/recoil/atoms";
import {
  ExpenseEntity,
  ExpenseInsertDTO,
  ExpenseSaved,
  ExpenseUpdateDTO,
} from "@/types";
import { TempId } from "@/types/ids";
import { diffFields } from "@/utils/diffFields";
import { parseCurrency } from "@/utils/format";
import { omit } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const ExpenseFormContext = createContext<ExpenseFormContextType | null>(null);

export const ExpenseFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const setExpenses = useSetRecoilState(expensesState);
  const [newExpenses, setNewExpenses] = useState<ExpenseEntity[]>([]);

  const [searchParams] = useSearchParams();

  const ids = searchParams.get("ids")?.split(",").map(Number) || [];
  const editExpenses = useFetchExpensesByIds(ids);

  useEffect(() => {
    if (editExpenses.length > 0) {
      setNewExpenses(editExpenses);
    }
  }, [editExpenses]);

  const { handleSaveExpense, handleDeleteExpense } = useExpenseHandlers({
    userId: userId!,
    setExpenses,
  });

  const handleAddExpense = () => {
    setNewExpenses((prev) => [...prev, createInitialExpense()]);
  };

  useEffect(() => {
    if (newExpenses.length === 0) handleAddExpense();
  }, [newExpenses]);

  const onSave = async () => {
    const saveData: (ExpenseInsertDTO | ExpenseUpdateDTO)[] = [];

    for (const newItem of newExpenses) {
      const cleanItem = omit(newItem, ["isDifferentAmount", "numberOfPeople"]);

      if (typeof cleanItem.id === "number" && editExpenses.length > 0) {
        const prev = editExpenses.find((e) => e.id === cleanItem.id);
        if (!prev) continue;

        const diffed = diffFields(prev, cleanItem);
        if (Object.keys(diffed).length === 0) {
          continue;
        }

        saveData.push({ ...diffed, id: cleanItem.id });
      } else {
        const { id, ...insertData } = cleanItem;
        saveData.push(insertData as ExpenseInsertDTO);
      }
    }
    if (saveData.length === 0) {
      toast.error("저장할 변경 사항이 없습니다.");
      return;
    }

    await handleSaveExpense(saveData);
    navigate("/expenses");
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
    id: number | TempId,
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
        categories,
        payMethods,
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
