import { IExpense } from "@/types";
import { formatCurrency } from "@/utils/format";
import { SplitAmountHandler } from "../types/handlers";

interface TableFormSplitRowProps {
  expense: IExpense;
  getSplitAmount: SplitAmountHandler;
}

export const TableFormSplitRow = ({
  expense,
  getSplitAmount,
}: TableFormSplitRowProps) => {
  return (
    <tr className="bg-emerald-50 border-t border-emerald-100">
      <td colSpan={8} className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center">
            <span className="text-emerald-700 font-medium mr-2">인원 수:</span>
            <input
              type="number"
              min="1"
              value={expense.numberOfPeople ?? 0}
              onChange={(e) =>
                getSplitAmount(Number(e.target.value), expense.id)
              }
              className="w-16 rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
            />
            <span className="text-emerald-700 ml-1">명</span>
          </div>
          <div className="flex items-center">
            <span className="text-emerald-700 font-medium mr-2">
              1인당 금액:
            </span>
            <span className="font-medium text-emerald-600">
              {formatCurrency(expense.actualAmount)}
            </span>
          </div>
          <div className="text-xs text-emerald-600 ml-auto">
            * 인원 수를 변경하면 1인당 금액이 자동으로 계산됩니다. 필요시 직접
            수정할 수 있습니다.
          </div>
        </div>
      </td>
    </tr>
  );
};
