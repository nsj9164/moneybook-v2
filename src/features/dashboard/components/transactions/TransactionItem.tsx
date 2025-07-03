import { formatCurrency } from "@/utils/format";

interface TransactionItemProps {
  transaction: ReactNode;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <div
      key={transaction.id}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
            transaction.type === "income" ? "bg-emerald-100" : "bg-red-100"
          }`}
        >
          {transaction.type === "income" ? (
            <ArrowDownRight className="h-5 w-5 text-emerald-600" />
          ) : (
            <ArrowUpRight className="h-5 w-5 text-red-600" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900">{transaction.description}</p>
          <p className="text-sm text-gray-500">
            {transaction.category} • {transaction.date}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-medium ${
            transaction.type === "income" ? "text-emerald-600" : "text-gray-900"
          }`}
        >
          {transaction.type === "income" ? "+" : ""}
          {formatCurrency(transaction.amount)}
        </p>
      </div>
    </div>
  );
};
