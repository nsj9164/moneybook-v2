import { ExpenseEntity, ExpenseSaved } from "@/types";
import { TempId } from "@/types/ids";

export type ExpenseFormContextType = {
  newExpenses: ExpenseEntity[];
  handleAddExpense: () => void;
  onUpdate: <K extends keyof ExpenseSaved>(
    value: ExpenseSaved[K],
    id: number | TempId,
    key: K
  ) => void;
  handleSplitAmountChange: (id: number | TempId, peopleCnt: number) => void;
  updateActualAmount: (amount: string, id: number, peopleCnt: number) => void;
  onSave: () => Promise<void>;
  onDelete: (id: number | TempId) => Promise<void>;
};
