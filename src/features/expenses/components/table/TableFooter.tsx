import { formatCurrency } from "@/utils/format";
import { ExpenseColumns } from "../../types/filters";

interface FooterProps {
  columns: ExpenseColumns[];
  filteredExpensesLen: number;
  totalPaymentAmount: number;
  totalActualAmount: number;
}

export const TableFooter = ({
  columns,
  filteredExpensesLen,
  totalPaymentAmount,
  totalActualAmount,
}: FooterProps) => {
  return (
    <tfoot className="bg-gray-50">
      <tr className="border-t-2 border-gray-300">
        <th
          colSpan={2}
          scope="row"
          className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
        >
          합계
        </th>
        <th
          colSpan={
            columns.filter(
              (col) =>
                col.visible &&
                col.id !== "date" &&
                col.id !== "paymentAmount" &&
                col.id !== "actualAmount"
            ).length
          }
          className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
        >
          {filteredExpensesLen}건
        </th>
        {columns.find((col) => col.id === "amount")?.visible && (
          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
            {formatCurrency(totalPaymentAmount)}
          </th>
        )}
        {columns.find((col) => col.id === "actualAmount")?.visible && (
          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
            {formatCurrency(totalActualAmount)}
          </th>
        )}
        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900"></th>
      </tr>
    </tfoot>
  );
};
