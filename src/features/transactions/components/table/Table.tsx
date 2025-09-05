import { TransactionSaved } from "@/types";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

interface TransactionsTableProps {
  filteredData: TransactionSaved[];
  selectedItems: number[];
  toggleSelectAll: () => void;
  toggleItemSelection: (id: number) => void;
}

export const TransactionsTable = ({
  filteredData,
  selectedItems,
  toggleSelectAll,
  toggleItemSelection,
}: TransactionsTableProps) => {
  // 합계 계산
  const totalPaymentAmount = filteredData.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalActualAmount = filteredData.reduce(
    (sum, expense) => sum + expense.actualAmount,
    0
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            checked={
              filteredData.length === selectedItems.length &&
              filteredData.length > 0
            }
            toggleSelectAll={toggleSelectAll}
          />
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredData.map((data) => (
              <TableRow
                key={data.id}
                data={data}
                checked={selectedItems.includes(data.id)}
                toggleItemSelection={toggleItemSelection}
              />
            ))}
          </tbody>

          <TableFooter
            filteredDataLen={filteredData.length}
            totalPaymentAmount={totalPaymentAmount}
            totalActualAmount={totalActualAmount}
          />
        </table>
      </div>
    </div>
  );
};
