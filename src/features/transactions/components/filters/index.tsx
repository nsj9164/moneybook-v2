import { TransactionFiltersState } from "../../types/filters";
import { CategorySaved, PayMethodSaved } from "@/types";
import { Filter } from "lucide-react";
import { FilterInputText } from "./inputs/FilterInputText";
import { FilterSelect } from "./inputs/FilterSelect";
import { FilterDatePanel } from "./panels/FilterDatePanel";
import { FilterAdvancedPanel } from "./panels/FilterAdvancedPanel";
import { FilterChips } from "./FilterChips";
import { FilterSummary } from "./FilterSummary";

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
  const { filterQuery, filterCategory, filterPayMethod } = filters;
  return (
    <>
      <FilterDatePanel />
      <FilterPanel />
      <FilterAdvancedPanel />
      <FilterChips />
      <FilterSummary />
    </>
  );
};
