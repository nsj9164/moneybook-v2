import { useState } from "react";
import { Plus } from "lucide-react";
import NotificationModal from "@/components/common/modal/NotificationModal";
import { useNotification } from "@/hooks/useNotification";
import { ContentHeader } from "@/components/common/layout/ContentHeader";
import { Button } from "@/components/ui/Button";
import { BudgetEntity } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { useBudgetDateFilter } from "../hooks/useBudgetDateFilter";
import { useBudgetHandlers } from "../hooks/useBudgetHandlers";
import { useBudgetData } from "../hooks/useBudgetData";
import { initialBudget } from "../constants/BudgetConstants";
import { DateFilterControl } from "../components/filter/DateFilterControl";
import { BudgetOverview } from "../components/summary/BudgetOverview";
import { EmptyFilterBudgetNotice } from "../components/list/EmptyFilterBudgetNotice";
import { EmptyBudgetNotice } from "../components/list/EmptyBudgetNotice";
import AddBudgetModal from "../components/modals/AddBudgetModal";
import { useModalFormArray } from "@/hooks/useModalFormArray";

const Budget = () => {
  const { userId } = useAuth();

  const {
    firstExpenseYear,
    selectedDate,
    years,
    handleChangeYear,
    handleChangeMonth,
  } = useBudgetDateFilter();

  const { budgets, unBudgets, refetchAll } = useBudgetData({
    selectedDate,
  });

  const [showDateSelector, setShowDateSelector] = useState(false);
  const toggleDateSelector = () => setShowDateSelector(!showDateSelector);

  const { notification, showSuccess, hideNotification } = useNotification();

  const { methods, isOpen, isEditing, openModal, closeModal } =
    useModalFormArray<BudgetEntity>(initialBudget());

  const { handleSaveBudget, handleDelBudget } = useBudgetHandlers({
    userId: userId!,
    selectedDate,
    refetchAll,
  });

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <ContentHeader
        title="예산 계획"
        desc="카테고리별 예산을 설정하고 지출을 체계적으로 관리하세요."
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
      </ContentHeader>

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
                onDelete={handleDelBudget}
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

      {/* 알림 모달 */}
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={hideNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        autoClose={notification.autoClose}
        autoCloseDelay={notification.autoCloseDelay}
      />
    </div>
  );
};

export default Budget;
