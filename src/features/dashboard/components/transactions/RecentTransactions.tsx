import { Download, Filter, MoreHorizontal } from "lucide-react";
import { TransactionItem } from "./TransactionItem";

export const RecentTransactions = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
      <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">최근 거래 내역</h3>
        <div className="flex items-center space-x-3">
          <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
          <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {recentTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>

      <div className="px-5 py-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-emerald-600 font-medium hover:text-emerald-700">
          모든 거래 보기
        </button>
      </div>
    </div>
  );
};
