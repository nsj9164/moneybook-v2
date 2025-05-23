import React from "react";
import { ExpensesFormProps } from "../types/types";
import { TableFormHeader } from "./TableFormHeader";
import { TableFormRow } from "./TableFormRow";
import { TableFormSplitRow } from "./TableFormSplitRow";

export const TableForm = ({
  newExpenses,
  categories,
  payMethods,
  handleUpdExpense,
  handleDelExpense,
  getSplitAmount,
  updateActualAmount,
}: ExpensesFormProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <TableFormHeader />

        <tbody className="divide-y divide-gray-200 bg-white">
          {newExpenses?.length > 0 &&
            newExpenses.map((expense) => (
              <React.Fragment key={expense.id}>
                <TableFormRow
                  expense={expense}
                  categories={categories}
                  payMethods={payMethods}
                  handleUpdExpense={handleUpdExpense}
                  handleDelExpense={handleDelExpense}
                  updateActualAmount={updateActualAmount}
                />
                {expense.isDifferentAmount && (
                  <TableFormSplitRow
                    expense={expense}
                    getSplitAmount={getSplitAmount}
                  />
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};
