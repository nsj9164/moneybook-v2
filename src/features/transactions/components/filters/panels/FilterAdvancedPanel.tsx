import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FilterCheckbox } from "../inputs/FilterCheckbox";

interface FilterAdvancedPanelProps {
  filterDifferentAmountOnly: boolean;
  filterRecurringOnly: boolean;
  isAdvancedFiltersOpen: boolean;
  handleAdvancedFilters: () => void;
  handleFiltersChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const FilterAdvancedPanel = ({
  filterDifferentAmountOnly,
  filterRecurringOnly,
  isAdvancedFiltersOpen,
  handleAdvancedFilters,
  handleFiltersChange,
}: FilterAdvancedPanelProps) => {
  return (
    <div className="mb-6 bg-gray-50 rounded-lg overflow-hidden">
      <button
        onClick={handleAdvancedFilters}
        className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center">
          <span>추가 필터</span>
        </div>
        {isAdvancedFiltersOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>

      <AnimatePresence>
        {isAdvancedFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-gray-200">
              <div className="pt-3 flex flex-wrap gap-4">
                <FilterCheckbox
                  label="결제금액과 실제지출이 다른 항목만 보기"
                  name="filterDifferentAmountOnly"
                  value={filterDifferentAmountOnly}
                  onChange={handleFiltersChange}
                />

                <FilterCheckbox
                  label="정기지출만 보기"
                  name="filterRecurringOnly"
                  value={filterRecurringOnly}
                  onChange={handleFiltersChange}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
