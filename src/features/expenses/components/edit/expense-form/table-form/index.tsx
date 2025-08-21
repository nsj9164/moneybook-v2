import {
  CategorySaved,
  ExpenseEntity,
  ExpenseInsertDTO,
  ExpenseSaved,
  ExpenseUpdateDTO,
  PayMethodSaved,
} from "@/types";
import { useFormContext } from "react-hook-form";
import { TableFormHeader } from "./TableFormHeader";
import { TableFormRow } from "./TableFormRow";
import { TableFormSplitRow } from "./TableFormSplitRow";

interface TableFormProps {
  editExpenses: ExpenseSaved[];
  categories: CategorySaved[];
  payMethods: PayMethodSaved[];
  onSave: (
    items: (ExpenseInsertDTO | ExpenseUpdateDTO)[]
  ) => void | Promise<void>;
}

export const TableForm = ({
  editExpenses,
  categories,
  payMethods,
  onSave,
}: TableFormProps) => {
  const { handleSubmit } = useFormContext<ExpenseEntity>();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <TableFormHeader />

        <tbody className="divide-y divide-gray-200 bg-white">
          {editExpenses?.length > 0 &&
            editExpenses.map((expense, index) => (
              <form onSubmit={handleSubmit(onSubmit)}>
                <TableFormRow
                  expense={expense}
                  categories={categories}
                  payMethods={payMethods}
                  handleUpdExpense={handleUpdExpense}
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
