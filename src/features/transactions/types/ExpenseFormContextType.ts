import {
  CategorySaved,
  TransactionEntity,
  TransactionSaved,
  PayMethodSaved,
} from "@/types";
import { TempId } from "@/types/ids";

export type ExpenseFormContextType = {
  newExpenses: TransactionEntity[];
  categories: CategorySaved[];
  payMethods: PayMethodSaved[];
  handleAddExpense: () => void;
  onUpdate: <K extends keyof TransactionSaved>(
    value: TransactionSaved[K],
    id: number | TempId,
    key: K
  ) => void;
  handleSplitAmountChange: (id: number | TempId, peopleCnt: number) => void;
  updateActualAmount: (
    amount: string,
    id: number | TempId,
    peopleCnt: number
  ) => void;
  onSave: () => Promise<void>;
  onDelete: (id: number | TempId) => Promise<void>;
};
