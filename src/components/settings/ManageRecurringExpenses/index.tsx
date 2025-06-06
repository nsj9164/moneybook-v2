import { useState } from "react";
import { Pencil, Trash2, Calendar, CreditCard } from "lucide-react";
import { GenericFormHeader } from "../common/GenericFormHeader";
import { PaginationFooter } from "../common/pagination/PaginationFooter";
import { usePagination } from "../utils/usePagination";
import { formatCurrency } from "@/utils/format";
import { GenericFormModal } from "../common/Modal/GenericFormModal";
import { deleteItem, saveItem } from "@/utils/crud";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";
import { useFetchRecurringExpenses } from "@/hooks/useFetchRecurringExpenses";
import { useSetRecoilState } from "recoil";
import { recurringState } from "@/recoil/atoms";
import { IRecurring } from "@/types/expense-types";
import { patchOrAddItem } from "@/utils/patchOrAddItem";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { initialRecurrings } from "./constants/RecurringConstans";
import { RecurringModalFields } from "./RecurringModalFields";
import { FormProvider, useForm } from "react-hook-form";
import { useCycleOptions } from "./hooks/useCycleOptions";
import { CommonCode } from "./types/common";

const ManageRecurringExpenses = () => {
  const { userId } = useAuth();
  const recurrings = useFetchRecurringExpenses();
  const setRecurrings = useSetRecoilState(recurringState);
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const cycleOptions = useCycleOptions();

  const methods = useForm({ defaultValues: initialRecurrings });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<IRecurring | undefined>(
    undefined
  );
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterActive, setFilterActive] = useState("active");
  const itemsPerPage = 6;
  // 검색 및 필터링 적용된 고정지출 목록
  const filteredExpenses = recurrings.filter((expense) => {
    const matchesSearch = expense.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "" || expense.categoryId === Number(filterCategory);
    const matchesActive =
      filterActive === "" ||
      (filterActive === "active" && expense.isActive) ||
      (filterActive === "inactive" && !expense.isActive);
    return matchesSearch && matchesCategory && matchesActive;
  });
  const { currentPage, totalPages, handlePageChange, startIndex, endIndex } =
    usePagination(filteredExpenses.length);

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  const handleAddRecurring = () => {
    setCurrentExpense(undefined);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditRecurring = (expense: IRecurring) => {
    setCurrentExpense(expense);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteRecurring = async (id: number) => {
    if (window.confirm("이 고정지출을 삭제하시겠습니까?")) {
      // setRecurringExpenses(recurrings.filter((e) => e.id !== expenseId));
      await deleteItem("recurring_expenses", id, () => {
        setRecurrings((prev) => prev.filter((item) => item.id !== id));
      });
    }
  };

  const handleToggleActive = (id: number) => {
    setRecurrings(
      recurrings.map((expense) =>
        expense.id === id
          ? { ...expense, isActive: !expense.isActive }
          : expense
      )
    );
  };

  const handleSaveRecurring = async (recurring: Partial<IRecurring>) => {
    await saveItem("recurring_expenses", recurring, userId!, (saved) => {
      setRecurrings((prev) => patchOrAddItem(prev, saved));
    });
  };

  // 총 월간 고정지출 계산
  const totalMonthlyAmount = recurrings
    .filter((expense) => expense.isActive)
    .reduce((sum, expense) => {
      // 주기에 따른 월간 환산 금액 계산
      let monthlyAmount = 0;
      switch (expense.cycle) {
        case 1:
          monthlyAmount = expense.amount * 30;
          break;
        case 2:
          monthlyAmount = expense.amount * 4.33;
          break;
        case 3:
          monthlyAmount = expense.amount * 2.17;
          break;
        case 4:
          monthlyAmount = expense.amount;
          break;
        case 5:
          monthlyAmount = expense.amount / 2;
          break;
        case 6:
          monthlyAmount = expense.amount / 3;
          break;
        case 7:
          monthlyAmount = expense.amount / 6;
          break;
        case 8:
          monthlyAmount = expense.amount / 12;
          break;
        default:
          monthlyAmount = expense.amount;
      }
      return sum + monthlyAmount;
    }, 0);

  return (
    <div className="bg-white h-full">
      <GenericFormHeader title="고정지출" handleAddData={handleAddRecurring} />

      <div className="p-4">
        {/* 요약 정보 */}
        <div className="mb-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                월간 고정지출 요약
              </h3>
              <p className="text-sm text-gray-500">
                활성화된 고정지출 {recurrings.filter((e) => e.isActive).length}
                개
              </p>
            </div>
            <div className="mt-3 sm:mt-0">
              <p className="text-sm text-gray-500">
                총 월간 고정지출:{" "}
                <span className="font-medium text-gray-900">
                  {formatCurrency(totalMonthlyAmount)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="sr-only">
              고정지출 검색
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
                placeholder="고정지출 검색"
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handlePageChange(1);
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category-filter" className="sr-only">
              카테고리 필터
            </label>
            <select
              id="category-filter"
              name="category-filter"
              className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                handlePageChange(1);
              }}
            >
              <option value="all">모든 카테고리</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="active-filter" className="sr-only">
              상태 필터
            </label>
            <select
              id="active-filter"
              name="active-filter"
              className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
              value={filterActive}
              onChange={(e) => {
                setFilterActive(e.target.value);
                handlePageChange(1);
              }}
            >
              <option value="all">모든 상태</option>
              <option value="active">활성화</option>
              <option value="inactive">비활성화</option>
            </select>
          </div>
        </div>

        {/* 고정지출 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedExpenses.length > 0 ? (
            paginatedExpenses.map((expense) => (
              <div
                key={expense.id}
                className={`rounded-lg border ${
                  expense.isActive
                    ? "border-gray-200"
                    : "border-gray-200 bg-gray-50"
                } shadow-sm p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center mr-3"
                      style={{
                        backgroundColor: expense.categoryColor,
                      }}
                    >
                      <span className="text-white text-sm">
                        {expense.categoryEmoji}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        {expense.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {expense.categoryName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(expense.amount)}
                    </p>

                    <p className="text-xs text-gray-500">
                      {expense.cycleLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {`매월 ${expense.paymentDay}일
                    ${
                      expense.billingEndDate
                        ? ` (${format(
                            expense.billingEndDate,
                            "yyyy-MM-dd"
                          )}까지)`
                        : ""
                    }`}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <CreditCard className="h-4 w-4 mr-1" />
                  <span>
                    {expense.paymentMethodEmoji} {expense.paymentMethodName}
                  </span>
                </div>

                {expense.note && (
                  <p className="text-sm text-gray-600 mb-3">{expense.note}</p>
                )}

                <div className="flex justify-between items-center mt-2">
                  <div>
                    <button
                      onClick={() => handleToggleActive(expense.id)}
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        expense.isActive
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {expense.isActive ? "활성화됨" : "비활성화됨"}
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditRecurring(expense)}
                      className="text-emerald-600 hover:text-emerald-900"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">편집</span>
                    </button>
                    <button
                      onClick={() => handleDeleteRecurring(expense.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">삭제</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 p-8 text-center text-gray-500">
              <p>검색 조건에 맞는 고정지출이 없습니다.</p>
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <PaginationFooter
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}
      </div>

      <FormProvider {...methods}>
        <GenericFormModal
          formTitle="고정지출"
          isOpen={isModalOpen}
          isEditing={isEditing}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveRecurring}
        >
          <RecurringModalFields
            categories={categories}
            payMethods={payMethods}
          />
        </GenericFormModal>
      </FormProvider>
    </div>
  );
};

export default ManageRecurringExpenses;
