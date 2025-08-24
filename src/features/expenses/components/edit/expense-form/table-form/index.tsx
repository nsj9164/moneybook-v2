import { ExpenseEntity } from "@/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useExpenseFormContext } from "../../context/ExpenseFormContext";
import { TableFormHeader } from "./TableFormHeader";
import { TableFormRow } from "./TableFormRow";
import { TableFormSplitRow } from "./TableFormSplitRow";

export const TableForm = () => {
  const { handleSubmit } = useFormContext<ExpenseEntity>();
  const { onSave, newExpenses, handleAddExpense } = useExpenseFormContext();

  useEffect(() => {
    console.log("##########", newExpenses.length);
    if (newExpenses.length === 0) handleAddExpense();
  }, [newExpenses]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <TableFormHeader />

        <tbody className="divide-y divide-gray-200 bg-white">
          {newExpenses?.length > 0 &&
            newExpenses.map((expense) => (
              <form key={expense.id} onSubmit={handleSubmit(onSave)}>
                <TableFormRow expense={expense} />
                {expense.isDifferentAmount && (
                  <TableFormSplitRow expense={expense} />
                )}
              </form>
            ))}
        </tbody>
      </table>
    </div>
  );
};
