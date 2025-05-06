import { formatCurrency } from "@/utils/format";

export const ExpensesListFooter = ({
  sumExpenses,
}: {
  sumExpenses: number;
}) => {
  return (
    <tfoot>
      <tr className="border-t-2 border-gray-300">
        <th
          colSpan={5}
          scope="row"
          className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell"
        >
          합계
        </th>
        <th
          scope="row"
          className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
        >
          합계
        </th>
        <td className="pl-3 pr-6 pt-4 text-right text-sm font-semibold text-gray-900">
          {formatCurrency(sumExpenses)}
        </td>
      </tr>
    </tfoot>
  );
};
