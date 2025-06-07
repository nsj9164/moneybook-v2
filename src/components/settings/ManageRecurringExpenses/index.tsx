import { useState } from "react";
import { Pencil, Trash2, Calendar, CreditCard } from "lucide-react";
import { GenericFormHeader } from "../common/GenericFormHeader";
import { PaginationFooter } from "../common/pagination/PaginationFooter";
import { usePagination } from "../utils/usePagination";
import { formatCurrency } from "@/utils/format";
import { GenericFormModal } from "../common/Modal/GenericFormModal";
import { deleteItem, insertItem, updateItem } from "@/utils/crud";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";
import { useFetchRecurringExpenses } from "@/hooks/useFetchRecurringExpenses";
import { useSetRecoilState } from "recoil";
import { recurringState } from "@/recoil/atoms";
import { patchOrAddItem } from "@/utils/patchOrAddItem";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { initialRecurrings } from "./constants/RecurringConstans";
import { RecurringModalFields } from "./RecurringModalFields";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useCycleOptions } from "./hooks/useCycleOptions";
import { RecurringSummaryCard } from "./RecurringSummaryCard";
import { RecurringFilterPanel } from "./RecurringFilterPanel";
import { matchHangul } from "@/utils/matchHangul";
import {
  RecurringDisplay,
  RecurringEntity,
  RecurringInput,
} from "@/types/expense-types";
import { calcTotalMonthlyAmount } from "./util";
import { RecurringCardList } from "./RecurringCardList";
import { useModalForm } from "../hooks/useModalForm";

const ManageRecurringExpenses = () => {
  const { userId } = useAuth();
  const recurrings = useFetchRecurringExpenses();
  const setRecurrings = useSetRecoilState(recurringState);
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  const cycleOptions = useCycleOptions();

  const { methods, isOpen, isEditing, openModal, closeModal } =
    useModalForm<RecurringEntity>(() => initialRecurrings);

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

  const itemsPerPage = 6;
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

  const { currentPage, totalPages, handlePageChange, startIndex, endIndex } =
    usePagination(filteredExpenses.length);

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handleDeleteRecurring = async (id: number) => {
    if (window.confirm("이 고정지출을 삭제하시겠습니까?")) {
      await deleteItem("recurring_expenses", id, () => {
        setRecurrings((prev) => prev.filter((item) => item.id !== id));
      });
    }
  };

  const handleSaveRecurring = async (
    recurring: Partial<RecurringEntity> | RecurringInput
  ) => {
    const saveFn =
      isEditing && "id" in recurring
        ? updateItem<RecurringEntity>
        : insertItem<RecurringInput>;
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
