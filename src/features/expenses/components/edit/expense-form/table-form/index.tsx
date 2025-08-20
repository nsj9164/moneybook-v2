import { calActualAmount } from "@/features/expenses/utils/expenseCalc";
import {
  CategorySaved,
  ExpenseEntity,
  ExpenseSaved,
  PayMethodSaved,
} from "@/types";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TableFormHeader } from "./TableFormHeader";
import { TableFormRow } from "./TableFormRow";
import { TableFormSplitRow } from "./TableFormSplitRow";

interface TableFormProps {
  editExpenses: ExpenseSaved[];
  categories: CategorySaved[];
  payMethods: PayMethodSaved[];
}

export const TableForm = ({
  editExpenses,
  categories,
  payMethods,
}: TableFormProps) => {
  const { handleSubmit } = useFormContext<ExpenseEntity | ExpenseSaved>();
  const [newExpenses, setNewExpenses] = useState<ExpenseEntity[]>([]);

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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <TableFormHeader />

        <tbody className="divide-y divide-gray-200 bg-white">
          {editExpenses?.length > 0 &&
            editExpenses.map((expense, index) => (
              <form onSubmit={handleSubmit(onSubmit)}>
                <TableFormRow
                  index={index}
                  expense={expense}
                  categories={categories}
                  payMethods={payMethods}
                />
                {expense.isDifferentAmount && (
                  <TableFormSplitRow
                    expense={expense}
                    onSplitAmountChange={(peopleCnt) =>
                      handleSplitAmountChange(expense.id, peopleCnt)
                    }
                  />
                )}
              </form>
            ))}
        </tbody>
      </table>
    </div>
  );
};
