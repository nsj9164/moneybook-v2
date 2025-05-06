import React from "react";
import { ExpensesFormProps } from "../types/types";
import { ExpenseFormTableHead } from "./ExpenseFormTableHead";
import { ExpenseFormTableRow } from "./ExpenseFormTableRow";
import { ExpenseFormTableSplitRow } from "./ExpenseFormTableSplitRow";

export const ExpenseTableForm = ({
  newExpenses,
  categories,
  payMethods,
  handleUpdExpense,
  handleDelExpense,
  getSplitAmount,
}: ExpensesFormProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <ExpenseFormTableHead />

        <tbody className="divide-y divide-gray-200 bg-white">
          {newExpenses?.length > 0 &&
            newExpenses.map((expense) => (
              <React.Fragment key={expense.id}>
                <ExpenseFormTableRow
                  expense={expense}
                  categories={categories}
                  payMethods={payMethods}
                  handleUpdExpense={handleUpdExpense}
                  handleDelExpense={handleDelExpense}
                />
                {expense.isDifferentAmount && (
                  <ExpenseFormTableSplitRow
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
