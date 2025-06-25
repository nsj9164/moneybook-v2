import { formatCurrency } from "@/utils/format";

interface TransactionItemProps {
    transaction: 
}

export const TransactionItem = ({transaction} : TransactionItemProps) => {
  return (
    <div
      key={transaction.id}
      className="p-5 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              transaction.category === "식비"
                ? "bg-rose-100"
                : transaction.category === "교통비"
                ? "bg-blue-100"
                : transaction.category === "쇼핑"
                ? "bg-emerald-100"
                : transaction.category === "여가"
                ? "bg-purple-100"
                : "bg-amber-100"
            }`}
          >
            <span
              className={`text-sm ${
                transaction.category === "식비"
                  ? "text-rose-600"
                  : transaction.category === "교통비"
                  ? "text-blue-600"
                  : transaction.category === "쇼핑"
                  ? "text-emerald-600"
                  : transaction.category === "여가"
                  ? "text-purple-600"
                  : "text-amber-600"
              }`}
            >
              {transaction.category.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {transaction.description}
            </p>
            <p className="text-xs text-gray-500">
              {transaction.date} · {transaction.paymentMethod}
            </p>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-900">
          {formatCurrency(transaction.amount)}
        </div>
      </div>
    </div>
  );
};
