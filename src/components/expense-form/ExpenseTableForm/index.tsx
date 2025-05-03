import React from "react";
import { ExpensesFormProps } from "../types/types";
import { ExpenseTableHead } from "./ExpenseTableHead";
import { ExpenseTableRow } from "./ExpenseTableRow";
import { ExpenseTableSplitRow } from "./ExpenseTableSplitRow";

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
        <ExpenseTableHead />

        <tbody className="divide-y divide-gray-200 bg-white">
          {newExpenses?.length > 0 &&
            newExpenses.map((expense) => (
              <React.Fragment key={expense.id}>
                <ExpenseTableRow
                  expense={expense}
                  categories={categories}
                  payMethods={payMethods}
                  handleUpdExpense={handleUpdExpense}
                  handleDelExpense={handleDelExpense}
                />
                {expense.isDifferentAmount && (
                  <ExpenseTableSplitRow
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
