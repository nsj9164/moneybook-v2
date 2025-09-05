import { TransactionSaved } from "@/types";
import { formatCurrency } from "@/utils/format";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

export const FilterSummary = ({
  filteredData,
}: {
  filteredData: TransactionSaved[];
}) => {
  const expenseTotal = filteredData
    .filter((e) => e.transactionType === 2)
    .reduce((sum, e) => sum + e.amount, 0);

  const incomeTotal = filteredData
    .filter((e) => e.transactionType === 1)
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center">
          <div className="bg-red-50 rounded-lg p-3 mr-4">
            <TrendingDown className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">총 지출</p>
            <p className="text-xl font-bold text-red-600">
              {formatCurrency(expenseTotal)}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-blue-50 rounded-lg p-3 mr-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">총 수입</p>
            <p className="text-xl font-bold text-blue-600">
              {formatCurrency(incomeTotal)}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-emerald-50 rounded-lg p-3 mr-4">
            <DollarSign className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">순 수익</p>
            <p
              className={`text-xl font-bold ${
                incomeTotal - expenseTotal >= 0
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {formatCurrency(incomeTotal - expenseTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
