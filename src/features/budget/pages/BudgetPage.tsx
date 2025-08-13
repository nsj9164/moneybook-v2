import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { useDateFilter } from "../../../hooks/useDateFilter";
import { useBudgetHandlers } from "../hooks/useBudgetHandlers";
import { useBudgetData } from "../hooks/useBudgetData";
import { initialBudget } from "../constants/BudgetConstants";
import { DateFilterControl } from "../../../components/monthSelector/DateFilterControl";
import { BudgetOverview } from "../components/view/BudgetOverview";
import { EmptyFilterBudgetNotice } from "../components/view/EmptyFilterBudgetNotice";
import { EmptyBudgetNotice } from "../components/view/EmptyBudgetNotice";
import AddBudgetModal from "../components/modals/AddBudgetModal";
import { useModalFormArray } from "@/hooks/useModalFormArray";
import { PageHeader } from "@/components/common/layout/PageHeader";
import { BudgetBase } from "@/types";

const Budget = () => {
  const { userId } = useAuth();

  const {
    firstExpenseYear,
    selectedDate,
    years,
    showDateSelector,
    toggleDateSelector,
    handleChangeYear,
    handleChangeMonth,
  } = useDateFilter();

  const { budgets, unBudgets, refetchAll } = useBudgetData({
    selectedDate,
  });

  const { methods, isOpen, isEditing, openModal, closeModal } =
    useModalFormArray<BudgetBase>(initialBudget());

  const { handleSaveBudget, handleDeleteBudget } = useBudgetHandlers({
    userId: userId!,
    selectedDate,
    refetchAll,
  });

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <PageHeader
        title="예산 계획"
        description="카테고리별 예산을 설정하고 지출을 체계적으로 관리하세요."
      >
        <div className="flex items-center space-x-3">
          <DateFilterControl
            selectedDate={selectedDate}
            showDateSelector={showDateSelector}
            years={years}
            toggleDateSelector={toggleDateSelector}
            handleChangeYear={handleChangeYear}
            handleChangeMonth={handleChangeMonth}
          />

          <Button variant="saveBtn" onClick={() => openModal()}>
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            예산 추가
          </Button>
        </div>
      </PageHeader>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 space-y-6">
        <AnimatePresence mode="wait">
          {budgets.length > 0 ? (
            <motion.div
              key="budget-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <BudgetOverview
                budgets={budgets}
                openModal={openModal}
                onDelete={handleDeleteBudget}
                selectedDate={selectedDate}
              />
            </motion.div>
          ) : typeof firstExpenseYear === "number" &&
            !isNaN(firstExpenseYear) ? (
            <EmptyFilterBudgetNotice
              openModal={() => openModal()}
              toggleDateSelector={toggleDateSelector}
              selectedDate={selectedDate}
            />
          ) : (
            <EmptyBudgetNotice openModal={() => openModal()} />
          )}
        </AnimatePresence>
      </div>

      {/* 예산 추가 모달 */}
      <FormProvider {...methods}>
        <AddBudgetModal
          isOpen={isOpen}
          isEditing={isEditing}
          onClose={closeModal}
          onSave={handleSaveBudget}
          unBudgets={unBudgets}
        />
      </FormProvider>
    </div>
  );
};

export default Budget;
