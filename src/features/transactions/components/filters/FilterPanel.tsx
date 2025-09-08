import { TransactionFiltersState } from "../../types/filters";
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
}

export const FilterPanel = ({
  filters,
  handleFiltersChange,
  resetFilters,
  categories,
  payMethods,
}: FilterPanelProps) => {
  const { startDate, endDate } = filters;
  return (
    <>
      <FilterDatePanel
        startDate={startDate}
        endDate={endDate}
        handleFiltersChange={handleFiltersChange}
      />
      <FilterBasicPanel
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        resetFilters={resetFilters}
        categories={categories}
        payMethods={payMethods}
      />
      <FilterAdvancedPanel />
    </>
  );
};
