import { TransactionSaved } from "@/types";
import { formatCurrency } from "@/utils/format";
import { FilterTab } from "../../types/filters";
import { FilterSummaryItem } from "./inputs/FilterSummaryItem";

export const FilterSummary = ({
  filteredData,
  selectedTab,
}: {
  filteredData: TransactionSaved[];
  selectedTab: FilterTab;
}) => {
  const selectedTabLabel = selectedTab === "expense" ? "지출" : "수입";
  const expenseTotal = filteredData
    .filter((e) => e.transactionType === 2)
    .reduce((sum, e) => sum + e.amount, 0);

  const incomeTotal = filteredData
    .filter((e) => e.transactionType === 1)
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <FilterSummaryItem
        label={`총 selectedTabLabel`}
        value={formatCurrency(
          filteredData.reduce((sum, item) => sum + item.actualAmount, 0)
        )}
        valueClassName={
          selectedTab === "expense" ? "text-red-600" : "text-emerald-600"
        }
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            selectedTab === "expense" ? "bg-red-100" : "bg-emerald-100"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full ${
              selectedTab === "expense" ? "bg-red-500" : "bg-emerald-500"
            }`}
          />
        </div>
      </FilterSummaryItem>

      <FilterSummaryItem
        label="평균 금액"
        value={formatCurrency(
          filteredData.length > 0
            ? Math.round(
                filteredData.reduce((sum, item) => sum + item.actualAmount, 0) /
                  filteredData.length
              )
            : 0
        )}
        valueClassName="text-blue-600"
      >
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full" />
        </div>
      </FilterSummaryItem>

      <FilterSummaryItem
        label="총 건수"
        value={filteredData.length}
        valueClassName="text-purple-600"
      >
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-purple-500 rounded-full" />
        </div>
      </FilterSummaryItem>
    </div>
  );
};
