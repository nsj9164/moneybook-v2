import { useMemo, useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useFetchCategories } from "@/hooks/fetchData/useFetchCategories";
import { useTransactionFilters } from "../hooks/useExpenseFilters";
import { Button } from "@/components/ui/Button";
import { ListHeader } from "../components/list/ListHeader";
import { FilterPanel } from "../components/filters/FilterPanel";
import { FilterSummary } from "../components/filters/FilterSummary";
import { FilterChips } from "../components/filters/FilterChips";
import { ListNoData } from "../components/list/ListNoData";
import { TransactionsTable } from "../components/table/Table";
import { ListNoFilteredData } from "../components/list/ListNoFilteredData";
import { ListFooter } from "../components/list/ListFooter";
import { useFetchExpenses } from "@/hooks/fetchData/useFetchExpenses";
import { useFetchPayMethods } from "@/hooks/fetchData/useFetchPayMethods";
import { Loading } from "@/components/common/loading/Loading";
import { ErrorBox } from "@/components/common/error/ErrorBox";
import { TransactionTabs } from "@/components/common/tabs/TransactionTabs";
import { FilterTab } from "../types/filters";
import { TransactionSaved } from "@/types";

const Transations = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<FilterTab>("all");

  const { transactions, loading, error, refetch } = useFetchExpenses();

  const expenses = useMemo(
    () => transactions.filter((data) => data.transactionType === 2),
    [transactions]
  );
  const incomes = useMemo(
    () => transactions.filter((data) => data.transactionType === 1),
    [transactions]
  );

  const targetData =
    selectedTab === "expense"
      ? expenses
      : selectedTab === "income"
      ? incomes
      : transactions;

  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const {
    filters,
    filteredData,
    handleFiltersChange,
    resetField,
    resetFilters,
    isActiveFilters,
  } = useTransactionFilters(targetData);

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories]
  );
  const payMethodMap = useMemo(
    () => new Map(payMethods.map((p) => [p.id, p.name])),
    [payMethods]
  );

  const categoryLabel = categoryMap.get(filters.filterCategory) ?? "전체";
  const payMethodLabel = payMethodMap.get(filters.filterPayMethod) ?? "전체";

  const toggleTab = (tab: FilterTab) => {
    setSelectedTab(tab);
  };

  // 체크박스 토글 핸들러
  const toggleItemSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // 전체 선택 토글 핸들러
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((data: TransactionSaved) => data.id));
    }
  };

  // open & close Filter
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen((prev) => !prev);
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorBox
        message="지출 데이터를 불러오는 데 실패했어요."
        onRetry={refetch}
      />
    );

  return (
    <div className="bg-white">
      {/* 페이지 헤더 */}
      <ListHeader activeTab={selectedTab} />

      <TransactionTabs activeTab={selectedTab} toggleTab={toggleTab} />

      {/* 필터 패널 */}
      {isFilterPanelOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          <FilterPanel
            filters={filters}
            handleFiltersChange={handleFiltersChange}
            resetFilters={resetFilters}
            toggleFilterPanel={toggleFilterPanel}
            categories={categories}
            payMethods={payMethods}
          />
        </motion.div>
      )}

      {/* 적용된 필터 표시 영역 */}
      {isActiveFilters && (
        <FilterChips
          filters={filters}
          resetFilters={resetFilters}
          resetField={resetField}
          categoryLabel={categoryLabel}
          payMethodLabel={payMethodLabel}
        />
      )}

      {/* 필터링 결과 요약 */}
      {filteredData.length > 0 && isActiveFilters && (
        <FilterSummary filteredData={filteredData} />
      )}

      {/* 지출 목록 테이블 또는 빈 상태 */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">지출 내역</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outlineWhite">
                <Download className="mr-1.5 -ml-0.5 h-4 w-4" />
                내보내기
              </Button>
              <Button
                variant="outlineWhite"
                disabled={selectedItems.length === 0}
              >
                <Trash2 className="mr-1.5 -ml-0.5 h-4 w-4 text-red-500" />
                선택 삭제 ({selectedItems.length})
              </Button>
            </div>
          </div>
        </div>

        <div className="p-5">
          {expenses.length === 0 ? (
            // 데이터 자체가 없는 경우 - 빈 상태 화면
            <ListNoData />
          ) : (
            // 데이터가 있는 경우 - 테이블 표시 (검색 결과 있음/없음 모두 포함)
            <>
              {filteredData.length > 0 ? (
                // 검색 결과가 있는 경우
                <TransactionsTable
                  filteredData={filteredData}
                  selectedItems={selectedItems}
                  toggleSelectAll={toggleSelectAll}
                  toggleItemSelection={toggleItemSelection}
                />
              ) : (
                // 검색 결과가 없는 경우
                <ListNoFilteredData resetFilters={resetFilters} />
              )}
            </>
          )}
        </div>

        {/* 페이지네이션 */}
        {filteredData.length > 0 && (
          <ListFooter filteredDataLen={filteredData.length} />
        )}
      </div>
    </div>
  );
};

export default Transations;
