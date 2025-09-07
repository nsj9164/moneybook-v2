export const FilterAdvancedPanel = () => {
  return (
    <div className="mb-6 bg-gray-50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center">
          <span>추가 필터</span>
          {hasActiveAdvancedFilters && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              {
                [showDifferentAmountOnly, showRecurringOnly].filter(Boolean)
                  .length
              }
              개 적용
            </span>
          )}
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
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showDifferentAmountOnly}
                    onChange={(e) =>
                      setShowDifferentAmountOnly(e.target.checked)
                    }
                    className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    결제금액과 실제지출이 다른 항목만 보기
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showRecurringOnly}
                    onChange={(e) => setShowRecurringOnly(e.target.checked)}
                    className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    정기지출만 보기
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
