import {
  CategorySaved,
  ExpenseEntity,
  ExpenseSaved,
  PayMethodSaved,
} from "@/types";
import { useFormContext } from "react-hook-form";
import { useExpenseFormContext } from "../../context/ExpenseFormContext";
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
  const { handleSubmit } = useFormContext<ExpenseEntity>();
  const { onSave } = useExpenseFormContext();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <TableFormHeader />

        <tbody className="divide-y divide-gray-200 bg-white">
          {editExpenses?.length > 0 &&
            editExpenses.map((expense) => (
              <form onSubmit={handleSubmit(onSave)}>
                <TableFormRow
                  expense={expense}
                  categories={categories}
                  payMethods={payMethods}
                />
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
