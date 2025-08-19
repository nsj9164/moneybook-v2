import { useState } from "react";
import { useFetchCategories } from "@/hooks/fetchData/useFetchCategories";
import { useSetRecoilState } from "recoil";
import { recurringState } from "@/recoil/atoms";
import { patchOrAddItem } from "@/utils/patchOrAddItem";
import { useAuth } from "@/contexts/AuthContext";
import { initialRecurrings } from "../manageRecurringExpenses/constants/RecurringConstants";
import { RecurringModalFields } from "../manageRecurringExpenses/components/modal/RecurringModalFields";
import { FormProvider } from "react-hook-form";
import { useCycleOptions } from "../manageRecurringExpenses/hooks/useCycleOptions";
import { matchHangul } from "@/utils/matchHangul";
import { RecurringBase, RecurringDisplay, RecurringSaved } from "@/types";
import { calcTotalMonthlyAmount } from "../manageRecurringExpenses/utils/monthlyAmountUtil";
import { RecurringFilterPanel } from "../manageRecurringExpenses/components/filters/RecurringFilterPanel";
import { useModalForm } from "@/hooks/useModalForm";
import { usePagination } from "@/features/settings/utils/usePagination";
import { GenericFormHeader } from "@/features/settings/components/common/form/GenericFormHeader";
import { RecurringSummaryCard } from "../manageRecurringExpenses/components/cards/RecurringSummaryCard";
import { RecurringCardList } from "../manageRecurringExpenses/components/cards/RecurringCardList";
import { PaginationFooter } from "@/features/settings/components/common/pagination/PaginationFooter";
import { GenericFormModal } from "@/features/settings/components/common/modal/GenericFormModal";
import { useFetchRecurringExpenses } from "@/hooks/fetchData/useFetchRecurringExpenses";
import { useFetchPayMethods } from "@/hooks/fetchData/useFetchPayMethods";
import { updateItem } from "@/api/supabase/updateItem";
import { insertItem } from "@/api/supabase/insertItem";
import { createDeleteItemHandler } from "@/utils/crudHandlers";
import { enrichRecurring } from "../manageRecurringExpenses/libs/enrichRecurring";
import { createPaginateAfterAdd } from "../utils/createPaginateAfterAdd";
import { ConfirmModal } from "@/components/common/modal/ConfirmModal";
import { useConfirmModal } from "@/hooks/useConfirmModal";

const ManageRecurringExpenses = () => {
  const { userId } = useAuth();
  const recurrings = useFetchRecurringExpenses();
  const setRecurrings = useSetRecoilState(recurringState);
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const cycleOptions = useCycleOptions();

  const { methods, isOpen, isEditing, openModal, closeModal } =
    useModalForm<RecurringBase>(initialRecurrings);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    active: "active",
  });

  const updateFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const key = e.currentTarget.name;
    const filterValue = e.currentTarget.value;

    setFilters((prev) => ({ ...prev, [key]: filterValue }));
    handlePageChange(1);
  };

  // 검색 및 필터링 적용된 고정지출 목록
  const filteredExpenses = recurrings.filter((expense) => {
    const matchesSearch = matchHangul(filters.search, expense.name);
    const matchesCategory =
      filters.category === "" ||
      expense.categoryId === Number(filters.category);
    const matchesActive =
      filters.active === "" ||
      (filters.active === "active" && expense.isActive) ||
      (filters.active === "inactive" && !expense.isActive);
    return matchesSearch && matchesCategory && matchesActive;
  });

  const itemsPerPage = 6;
  const {
    currentPage,
    totalPages,
    handlePageChange,
    goToLastPageIfNeeded,
    startIndex,
    endIndex,
  } = usePagination(filteredExpenses.length, itemsPerPage);

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginateAfterAdd = createPaginateAfterAdd(
    () => filteredExpenses.length + 1,
    goToLastPageIfNeeded
  );

  const handleSaveRecurring = async (recurring: Partial<RecurringSaved>) => {
    const isEdit =
      isEditing && "id" in recurring && typeof recurring.id === "number";

    const saved = isEdit
      ? await updateItem<RecurringSaved>(
          "recurring_expenses",
          recurring,
          userId!
        )
      : await insertItem<RecurringBase, RecurringDisplay>(
          "recurring_expenses",
          recurring as RecurringBase,
          userId!
        );

    const enriched = enrichRecurring(
      saved,
      categories,
      payMethods,
      cycleOptions
    );

    setRecurrings((prev) => patchOrAddItem(prev, enriched));
  };

  const handleDeleteRecurring = createDeleteItemHandler<RecurringSaved>(
    "recurring_expenses",
    setRecurrings
  );

  const { isConfirm, openConfirm, closeConfirm, handleConfirm } =
    useConfirmModal<number>(handleDeleteRecurring);

  const totalMonthly = calcTotalMonthlyAmount(recurrings);
  const activeLen = recurrings.filter((e) => e.isActive).length;

  return (
    <div className="bg-white h-full">
      <GenericFormHeader title="고정지출" openModal={openModal} />

      <div className="p-4">
        {/* 요약 정보 */}
        <RecurringSummaryCard
          activeLen={activeLen}
          totalMonthly={totalMonthly}
        />

        {/* 검색 및 필터 */}
        <RecurringFilterPanel
          filters={filters}
          updateFilter={updateFilter}
          categories={categories}
        />

        {/* 고정지출 목록 */}
        <RecurringCardList
          data={paginatedExpenses}
          openModal={openModal}
          onDelete={openConfirm}
        />

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
          isOpen={isOpen}
          isEditing={isEditing}
          onClose={closeModal}
          onSave={handleSaveRecurring}
          paginateAfterAdd={paginateAfterAdd}
        >
          <RecurringModalFields
            categories={categories}
            payMethods={payMethods}
          />
        </GenericFormModal>
      </FormProvider>

      <ConfirmModal
        isOpen={isConfirm}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ManageRecurringExpenses;
