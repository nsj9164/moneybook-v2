import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useFetchCategories } from "@/hooks/fetchData/useFetchCategories";
import { useExpenseFilters } from "../hooks/useExpenseFilters";
import { allColumns } from "../types/filters";
import { UUID } from "@/types/ids";
import { Button } from "@/components/ui/Button";
import { ListHeader } from "../components/list/ListHeader";
import { FilterPanel } from "../components/filters/FilterPanel";
import { FilterSummary } from "../components/filters/FilterSummary";
import { FilterChips } from "../components/filters/FilterChips";
import { ListNoData } from "../components/list/ListNoData";
import { ExpensesTable } from "../components/table/Table";
import { ListNoFilteredData } from "../components/list/ListNoFilteredData";
import { ListFooter } from "../components/list/ListFooter";
import { ColumnSettingsModal } from "../components/modals/ColumnSettingsModal";
import { useFetchExpenses } from "@/hooks/fetchData/useFetchExpenses";
import { useFetchPayMethods } from "@/hooks/fetchData/useFetchPayMethods";

const Expenses = () => {
  const expenses = useFetchExpenses();
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const {
    filters,
    filteredExpenses,
    handleFiltersChange,
    resetField,
    resetFilters,
    isAcitveFilters,
  } = useExpenseFilters(expenses);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [columns, setColumns] = useState(allColumns);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // 체크박스 토글 핸들러
  const toggleItemSelection = (id: UUID) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // 전체 선택 토글 핸들러
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredExpenses.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredExpenses.map((expense) => expense.id));
    }
  };

  // 컬럼 가시성 토글 핸들러
  const toggleColumnVisibility = (columnId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  // 컬럼 가시성 모달 열기
  const openColumnModal = () => {
    setIsColumnModalOpen(true);
  };

  // 컬럼 가시성 모달 닫기
  const closeColumnModal = () => {
    setIsColumnModalOpen(false);
  };

  const toggleColumnModal = (type: boolean) => {
    setIsColumnModalOpen(type);
  };

  // 보이는 컬럼 필터링
  const visibleColumns = columns.filter((col) => col.visible);

  // open & close Filter
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen((prev) => !prev);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      {/* 페이지 헤더 */}
      <ListHeader
        chkListCnt={expenses.length}
        filterQuery={filters.filterQuery}
        handleFiltersChange={handleFiltersChange}
        toggleFilterPanel={toggleFilterPanel}
      />

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
            openColumnModal={openColumnModal}
          />
        </motion.div>
      )}

      {/* 적용된 필터 표시 영역 */}
      {isAcitveFilters && (
        <FilterSummary
          filters={filters}
          resetFilters={resetFilters}
          resetField={resetField}
        />
      )}

      {/* 필터링 결과 요약 */}
      {filteredExpenses.length > 0 && isAcitveFilters && (
        <FilterChips filteredExpenses={filteredExpenses} />
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
              {filteredExpenses.length > 0 ? (
                // 검색 결과가 있는 경우
                <ExpensesTable
                  columns={columns}
                  filteredExpenses={filteredExpenses}
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
        {filteredExpenses.length > 0 && (
          <ListFooter filteredExpensesLen={filteredExpenses.length} />
        )}
      </div>

      {/* 컬럼 설정 모달 */}
      {isColumnModalOpen && (
        <ColumnSettingsModal
          isColumnModalOpen={isColumnModalOpen}
          closeColumnModal={closeColumnModal}
          columns={columns}
          toggleColumnVisibility={toggleColumnVisibility}
        />
      )}
    </div>
  );
};

export default Expenses;
