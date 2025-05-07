import { IExpense, UUID } from "@/types/expense-types";
import { Dispatch, SetStateAction } from "react";
import { ExpensesListFooter } from "./ExpensesListFooter";
import { ExpensesListHead } from "./ExpensesListHead";
import { ExpensesListRow } from "./ExpensesListRow";

interface ExpensesListProps {
  expenses: IExpense[];
  setChkList: Dispatch<SetStateAction<UUID[]>>;
}

export const ExpensesListTable = ({
  expenses,
  setChkList,
}: ExpensesListProps) => {
  const sumExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <ExpensesListHead />
            <tbody className="divide-y divide-gray-200 bg-white">
              {expenses.map((expense) => (
                <ExpensesListRow
                  key={expense.id}
                  expense={expense}
                  setChkList={setChkList}
                />
              ))}
            </tbody>

            <ExpensesListFooter sumExpenses={sumExpenses} />
          </table>
        </div>
      </div>
    </div>
  );
};
