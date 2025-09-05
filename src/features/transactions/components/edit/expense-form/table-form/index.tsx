import React from "react";
import { TransactionEntity } from "@/types";
import { useFormContext } from "react-hook-form";
import { useExpenseFormContext } from "../../context/ExpenseFormContext";
import { TableFormHeader } from "./TableFormHeader";
import { TableFormRow } from "./TableFormRow";
import { TableFormSplitRow } from "./TableFormSplitRow";

export const TableForm = () => {
  const { handleSubmit } = useFormContext<TransactionEntity>();
  const { onSave, newExpenses } = useExpenseFormContext();

  return (
    <div className="overflow-x-auto">
      <form onSubmit={handleSubmit(onSave)}>
        <table className="min-w-full divide-y divide-gray-300">
          <TableFormHeader />

          <tbody className="divide-y divide-gray-200 bg-white">
            {newExpenses?.length > 0 &&
              newExpenses.map((expense) => (
                <React.Fragment key={expense.id}>
                  <TableFormRow expense={expense} />
                  {expense.isDifferentAmount && (
                    <TableFormSplitRow expense={expense} />
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};
