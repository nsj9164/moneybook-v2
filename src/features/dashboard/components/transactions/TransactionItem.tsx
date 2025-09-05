import { TransactionSaved } from "@/types";
import { formatCurrency } from "@/utils/format";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface TransactionItemProps {
  expense: TransactionSaved;
}

export const TransactionItem = ({ expense }: TransactionItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            expense.transactionType === 1 ? "bg-emerald-100" : "bg-red-100"
          }`}
        >
          {expense.transactionType === 1 ? (
            <ArrowDownRight className="h-5 w-5 text-emerald-600" />
          ) : (
            <ArrowUpRight className="h-5 w-5 text-red-600" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900">{expense.itemName}</p>
          <p className="text-sm text-gray-500">
            {expense.categories?.name} • {expense.date}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-medium ${
            expense.transactionType === 1 ? "text-emerald-600" : "text-gray-900"
          }`}
        >
          {expense.transactionType === 1 ? "+" : ""}
          {formatCurrency(expense.amount)}
        </p>
      </div>
    </div>
  );
};
