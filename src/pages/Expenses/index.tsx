import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ExpensesFilterPanel } from "@/components/expenses/ExpensesFilterPanel";
import { useFetchExpenses } from "@/hooks/useFetchExpenses";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";
import { useExpenseFilters } from "./hooks/useExpenseFilters";
import { ColumnSettingsModal } from "@/components/expenses/ColumnSettingsModal";
import { ExpensesFilterSummary } from "@/components/expenses/ExpensesFilterSummary";
import { ExpensesFilterChips } from "@/components/expenses/ExpensesFilterChips";
import { ExpensesListNoFilteredData } from "@/components/expenses/list/ExpensesListNoFilteredData";
import { ExpensesListNoData } from "@/components/expenses/list/ExpensesListNoData";
import { allColumns } from "./types/filters";
import { ExpensesHeader } from "@/components/expenses/list/ExpensesHeader";
import { formatCurrency } from "@/utils/format";
import { ExpensesListRow } from "@/components/expenses/list/ExpensesListRow";
import { UUID } from "@/types/expense-types";

const Expenses = () => {
  const navigate = useNavigate();
  const expenses = useFetchExpenses();
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const {
    filters,
    setFilters,
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

  // 보이는 컬럼 필터링
  const visibleColumns = columns.filter((col) => col.visible);

  // 합계 계산
  const totalPaymentAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalActualAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.actualAmount,
    0
  );

  const editExpense = (id: UUID) => {
    // id를 가져가야하는데 그 방법은 조금 더 생각이 필요함!!
    navigate("/expenses/edit");
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      {/* 페이지 헤더 */}
      <ExpensesHeader
        chkListCnt={expenses.length}
        filterQuery={filters.filterQuery}
        handleFiltersChange={handleFiltersChange}
        isActiveFilters={isAcitveFilters}
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
          <ExpensesFilterPanel
            filters={filters}
            handleFiltersChange={handleFiltersChange}
            resetFilters={resetFilters}
            setIsFilterPanelOpen={setIsFilterPanelOpen}
            categories={categories}
            payMethods={payMethods}
            openColumnModal={openColumnModal}
          />
        </motion.div>
      )}

      {/* 적용된 필터 표시 영역 */}
      {isAcitveFilters && (
        <ExpensesFilterSummary
          filters={filters}
          resetFilters={resetFilters}
          resetField={resetField}
        />
      )}

      {/* 필터링 결과 요약 */}
      {filteredExpenses.length > 0 && isAcitveFilters && (
        <ExpensesFilterChips filteredExpenses={filteredExpenses} />
      )}

      {/* 지출 목록 테이블 또는 빈 상태 */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">지출 내역</h2>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <Download className="mr-1.5 -ml-0.5 h-4 w-4" />
                내보내기
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                disabled={selectedItems.length === 0}
              >
                <Trash2 className="mr-1.5 -ml-0.5 h-4 w-4 text-red-500" />
                선택 삭제 ({selectedItems.length})
              </button>
            </div>
          </div>
        </div>

        <div className="p-5">
          {expenses.length === 0 ? (
            // 데이터 자체가 없는 경우 - 빈 상태 화면
            <ExpensesListNoData />
          ) : (
            // 데이터가 있는 경우 - 테이블 표시 (검색 결과 있음/없음 모두 포함)
            <>
              {filteredExpenses.length > 0 ? (
                // 검색 결과가 있는 경우
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="w-12 px-6 py-4 sm:w-16 sm:px-8"
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                              checked={
                                selectedItems.length ===
                                  filteredExpenses.length &&
                                filteredExpenses.length > 0
                              }
                              onChange={toggleSelectAll}
                              disabled={filteredExpenses.length === 0}
                            />
                          </th>
                          {columns.map(
                            (col) =>
                              col.visible && (
                                <th
                                  scope="col"
                                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                                >
                                  {col.name}
                                </th>
                              )
                          )}
                          <th
                            scope="col"
                            className="px-6 py-4 text-right text-sm font-semibold text-gray-900"
                          >
                            액션
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredExpenses.map((expense) => (
                          <ExpensesListRow
                            expense={expense}
                            checked={selectedItems.includes(expense.id)}
                            columns={columns}
                            editExpense={editExpense}
                            toggleItemSelection={toggleItemSelection}
                          />
                        ))}
                      </tbody>
                      {filteredExpenses.length > 0 && (
                        <tfoot className="bg-gray-50">
                          <tr className="border-t-2 border-gray-300">
                            <th
                              colSpan={2}
                              scope="row"
                              className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                              합계
                            </th>
                            <th
                              colSpan={
                                columns.filter(
                                  (col) =>
                                    col.visible &&
                                    col.id !== "date" &&
                                    col.id !== "paymentAmount" &&
                                    col.id !== "actualAmount"
                                ).length
                              }
                              className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                              {filteredExpenses.length}건
                            </th>
                            {columns.find((col) => col.id === "paymentAmount")
                              ?.visible && (
                              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                                {formatCurrency(totalPaymentAmount)}
                              </th>
                            )}
                            {columns.find((col) => col.id === "actualAmount")
                              ?.visible && (
                              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                                {formatCurrency(totalActualAmount)}
                              </th>
                            )}
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900"></th>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>
                </div>
              ) : (
                // 검색 결과가 없는 경우
                <ExpensesListNoFilteredData resetFilters={resetFilters} />
              )}
            </>
          )}
        </div>

        {/* 페이지네이션 */}
        {filteredExpenses.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  총{" "}
                  <span className="font-medium">{filteredExpenses.length}</span>{" "}
                  항목
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  이전
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
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
