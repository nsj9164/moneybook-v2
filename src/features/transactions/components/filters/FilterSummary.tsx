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
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeTab === "expense" ? "bg-red-100" : "bg-emerald-100"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full ${
                  activeTab === "expense" ? "bg-red-500" : "bg-emerald-500"
                }`}
              />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">
              총 {activeTab === "expense" ? "지출" : "수입"}
            </p>
            <p
              className={`text-lg font-semibold ${
                activeTab === "expense" ? "text-red-600" : "text-emerald-600"
              }`}
            >
              {formatCurrency(
                filteredData.reduce((sum, item) => sum + item.actualAmount, 0)
              )}
              원
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">평균 금액</p>
            <p className="text-lg font-semibold text-blue-600">
              {formatCurrency(
                filteredData.length > 0
                  ? Math.round(
                      filteredData.reduce(
                        (sum, item) => sum + item.actualAmount,
                        0
                      ) / filteredData.length
                    )
                  : 0
              )}
              원
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-500 rounded-full" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">총 건수</p>
            <p className="text-lg font-semibold text-purple-600">
              {filteredData.length}건
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
