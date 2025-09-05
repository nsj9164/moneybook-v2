import { formatCurrency } from "@/utils/format";
import { allColumns } from "../../types/filters";

interface FooterProps {
  filteredDataLen: number;
  totalPaymentAmount: number;
  totalActualAmount: number;
}

export const TableFooter = ({
  filteredDataLen,
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
            allColumns.filter(
              (col) =>
                col.id !== "date" &&
                col.id !== "paymentAmount" &&
                col.id !== "actualAmount"
            ).length
          }
          className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
        >
          {filteredDataLen}건
        </th>
        {allColumns.find((col) => col.id === "amount") && (
          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
            {formatCurrency(totalPaymentAmount)}
          </th>
        )}
        {allColumns.find((col) => col.id === "actualAmount") && (
          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
            {formatCurrency(totalActualAmount)}
          </th>
        )}
        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900"></th>
      </tr>
    </tfoot>
  );
};
