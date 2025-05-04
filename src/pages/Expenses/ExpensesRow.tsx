import { IExpense } from "@/types/expense-types";
import { formatCurrency } from "@/utils/format";
import { ExpensesRowHead } from "./ExpensesRowHead";

export const ExpensesRow = (expenses: IExpense[]) => {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <ExpensesRowHead />
          </table>
        </div>
      </div>
    </div>
  );
};
