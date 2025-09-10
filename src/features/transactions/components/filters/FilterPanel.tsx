import { MonthlyDateProps, TransactionFiltersState } from "../../types/filters";
import { CategorySaved, PayMethodSaved } from "@/types";
import { FilterDatePanel } from "./panels/FilterDatePanel";
import { FilterAdvancedPanel } from "./panels/FilterAdvancedPanel";
import { FilterBasicPanel } from "./panels/FilterBasicPanel";

interface FilterPanelProps {
  filters: TransactionFiltersState;
  handleFiltersChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  resetFilters: () => void;
  categories: CategorySaved[];
  payMethods: PayMethodSaved[];
  isAdvancedFiltersOpen: boolean;
  handleAdvancedFilters: () => void;
  monthlyDateFilters: MonthlyDateProps;
}

export const FilterPanel = ({
  filters,
  handleFiltersChange,
  resetFilters,
  categories,
  payMethods,
  isAdvancedFiltersOpen,
  handleAdvancedFilters,
  monthlyDateFilters,
}: FilterPanelProps) => {
  const { startDate, endDate, filterDifferentAmountOnly, filterRecurringOnly } =
    filters;
  return (
    <>
      <FilterDatePanel
        startDate={startDate}
        endDate={endDate}
        handleFiltersChange={handleFiltersChange}
        monthlyDateFilters={monthlyDateFilters}
      />
      <FilterBasicPanel
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        resetFilters={resetFilters}
        categories={categories}
        payMethods={payMethods}
      />
      <FilterAdvancedPanel
        filterDifferentAmountOnly={filterDifferentAmountOnly}
        filterRecurringOnly={filterRecurringOnly}
        isAdvancedFiltersOpen={isAdvancedFiltersOpen}
        handleAdvancedFilters={handleAdvancedFilters}
        handleFiltersChange={handleFiltersChange}
      />
    </>
  );
};
