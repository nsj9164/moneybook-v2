import { ExpenseColumns } from "@/pages/Expenses/types/filters";
import { IExpense, UUID } from "@/types/expense-types";
import { formatCurrency } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { ExpensesListRow } from "./ExpensesListRow";
import { ExpensesListTableFooter } from "./ExpensesListTableFooter";
import { ExpensesListTableHeader } from "./ExpensesListTableHeader";

interface ExpensesListProps {
  columns: ExpenseColumns[];
  filteredExpenses: IExpense[];
  selectedItems: string[];
  toggleSelectAll: () => void;
  toggleItemSelection: (id: UUID) => void;
}

export const ExpensesListTable = ({
  columns,
  filteredExpenses,
  selectedItems,
  toggleSelectAll,
  toggleItemSelection,
}: ExpensesListProps) => {
  const navigate = useNavigate();
  const editExpense = (id: UUID) => {
    // id를 가져가야하는데 그 방법은 조금 더 생각이 필요함!!
    navigate("/expenses/edit");
  };

  // 합계 계산
  const totalPaymentAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalActualAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.actualAmount,
    0
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <ExpensesListTableHeader />
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredExpenses.map((expense) => (
              <ExpensesListRow
                expense={expense}
                checked={selectedItems.includes(expense.id)}
                columns={columns}
                editExpense={editExpense}
                toggleItemSelection={toggleItemSelection}
              />
            ))}
          </tbody>

          <ExpensesListTableFooter
            columns={columns}
            filteredExpensesLen={filteredExpenses.length}
            totalPaymentAmount={totalPaymentAmount}
          />
        </table>
      </div>
    </div>
  );
};
