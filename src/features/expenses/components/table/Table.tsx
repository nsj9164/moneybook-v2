import { ExpenseSaved } from "@/types";
import { useNavigate } from "react-router-dom";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { ExpenseColumns } from "../../types/filters";

interface ExpensesTableProps {
  columns: ExpenseColumns[];
  filteredExpenses: ExpenseSaved[];
  selectedItems: number[];
  toggleSelectAll: () => void;
  toggleItemSelection: (id: number) => void;
}

export const ExpensesTable = ({
  columns,
  filteredExpenses,
  selectedItems,
  toggleSelectAll,
  toggleItemSelection,
}: ExpensesTableProps) => {
  const navigate = useNavigate();
  const editExpense = (id: number) => {
    // id를 가져가야하는데 그 방법은 조금 더 생각이 필요함!!
    console.log(id);
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
          <TableHeader
            columns={columns}
            checked={
              filteredExpenses.length === selectedItems.length &&
              filteredExpenses.length > 0
            }
            toggleSelectAll={toggleSelectAll}
          />
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredExpenses.map((expense) => (
              <TableRow
                key={expense.id}
                expense={expense}
                checked={selectedItems.includes(expense.id)}
                columns={columns}
                editExpense={editExpense}
                toggleItemSelection={toggleItemSelection}
              />
            ))}
          </tbody>

          <TableFooter
            columns={columns}
            filteredExpensesLen={filteredExpenses.length}
            totalPaymentAmount={totalPaymentAmount}
            totalActualAmount={totalActualAmount}
          />
        </table>
      </div>
    </div>
  );
};
