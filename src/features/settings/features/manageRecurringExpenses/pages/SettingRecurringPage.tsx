import { useState } from "react";
import { deleteItem, insertItem, updateItem } from "@/utils/crud";
import { useFetchCategories } from "@/hooks/fetchData/useFetchCategories";
import { useSetRecoilState } from "recoil";
import { recurringState } from "@/recoil/atoms";
import { patchOrAddItem } from "@/utils/patchOrAddItem";
import { useAuth } from "@/contexts/AuthContext";
import { initialRecurrings } from "../constants/RecurringConstants";
import { RecurringModalFields } from "../components/modal/RecurringModalFields";
import { FormProvider } from "react-hook-form";
import { useCycleOptions } from "../hooks/useCycleOptions";
import { matchHangul } from "@/utils/matchHangul";
import { RecurringDisplay, RecurringEntity } from "@/types";
import { calcTotalMonthlyAmount } from "../utils/monthlyAmountUtil";
import { RecurringFilterPanel } from "../components/filters/RecurringFilterPanel";
import { useModalForm } from "@/hooks/useModalForm";
import { usePagination } from "@/features/settings/utils/usePagination";
import { GenericFormHeader } from "@/features/settings/components/common/form/GenericFormHeader";
import { RecurringSummaryCard } from "../components/cards/RecurringSummaryCard";
import { RecurringCardList } from "../components/cards/RecurringCardList";
import { PaginationFooter } from "@/features/settings/components/common/pagination/PaginationFooter";
import { GenericFormModal } from "@/features/settings/components/common/modal/GenericFormModal";
import { useFetchRecurringExpenses } from "@/hooks/fetchData/useFetchRecurringExpenses";
import { useFetchPayMethods } from "@/hooks/fetchData/useFetchPayMethods";

const ManageRecurringExpenses = () => {
  const { userId } = useAuth();
  const recurrings = useFetchRecurringExpenses();
  const setRecurrings = useSetRecoilState(recurringState);
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const cycleOptions = useCycleOptions();

  const { methods, isOpen, isEditing, openModal, closeModal } =
    useModalForm<RecurringEntity>(initialRecurrings);

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
  const { currentPage, totalPages, handlePageChange, startIndex, endIndex } =
    usePagination(filteredExpenses.length, itemsPerPage);

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteRecurring = async (id: number) => {
    if (window.confirm("이 고정지출을 삭제하시겠습니까?")) {
      await deleteItem("recurring_expenses", id, () => {
        setRecurrings((prev) => prev.filter((item) => item.id !== id));
      });
    }
  };

  const handleSaveRecurring = async (recurring: Partial<RecurringEntity>) => {
    const saveFn =
      isEditing && "id" in recurring
        ? updateItem<RecurringEntity>
        : insertItem<RecurringEntity>;
    await saveFn("recurring_expenses", recurring as any, userId!, (saved) => {
      if (!("id" in saved)) throw new Error("id 데이터가 누락되었습니다.");

      const category = categories.find((c) => c.id === saved.categoryId);
      const payMethod = payMethods.find((p) => p.id === saved.paymentMethodId);
      const cycle = cycleOptions.find((l) => l.value === saved.cycle);

      const enriched: RecurringDisplay = {
        ...saved,
        categoryName: category?.name,
        categoryEmoji: category?.emoji,
        categoryColor: category?.color,
        paymentMethodName: payMethod?.name,
        paymentMethodEmoji: payMethod?.emoji,
        cycleLabel: cycle?.label,
      };

      setRecurrings((prev) => patchOrAddItem(prev, enriched));
    });
  };

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
          onDelete={handleDeleteRecurring}
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
