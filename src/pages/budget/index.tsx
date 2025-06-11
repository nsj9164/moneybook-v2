import { useMemo, useState, useEffect } from "react";
import { Plus } from "lucide-react";
import AddBudgetModal from "@/components/budget/modals/AddBudgetModal";
import NotificationModal from "@/components/common/modal/NotificationModal";
import { useNotification } from "@/hooks/useNotification";
import { ContentHeader } from "@/components/common/layout/ContentHeader";
import { UsageProgress } from "@/components/budget/progress/UsageProgress";
import { useBudgetCategories } from "@/hooks/useBudgetCategories";
import { CardSection } from "@/components/common/layout/CardSection";
import { Button } from "@/components/ui/Button";
import { DateFilterControl } from "@/components/budget/filter/DateFilterControl";
import { SummarySection } from "@/components/budget/summary/SummarySection";
import { useFirstExpenseYear } from "@/hooks/useFirstExpenseYear";
import { useModalFormArray } from "@/components/settings/hooks/useModalFormArray";
import { BudgetFormInput, BudgetSubmitInput } from "@/types";
import { useSetRecoilState } from "recoil";
import { budgetState } from "@/recoil/atoms";
import { useAuth } from "@/contexts/AuthContext";
import { updateItem } from "@/utils/crud";
import { patchItem } from "@/utils/patchItem";
import { initialBudget } from "@/components/budget/constants/BudgetConstants";
import { AnimatePresence } from "framer-motion";
import { EmptyBudgetNotice } from "@/components/budget/list/EmptyBudgetNotice";
import { motion } from "framer-motion";
import { BudgetCategoryItem } from "@/components/budget/list/BudgetCategoryItem";
import { FormProvider } from "react-hook-form";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { useBudgetDateFilter } from "./hook/useBudgetDateFilter";
import { EmptyFilterBudgetNotice } from "@/components/budget/list/EmptyFilterBudgetNotice";

const Budget = () => {
  const { userId } = useAuth();

  const {
    firstExpenseYear,
    selectedDate,
    startDate,
    endDate,
    years,
    handleChangeYear,
    handleChangeMonth,
  } = useBudgetDateFilter();
  console.log("#################", firstExpenseYear);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const toggleDateSelector = () => setShowDateSelector(!showDateSelector);

  const { categories, loading, refetch } = useBudgetCategories({
    startDate,
    endDate,
  });
  const budgetedCategories = categories.filter((item) => item.budgetYn);

  const { notification, showSuccess, hideNotification } = useNotification();

  const setBudget = useSetRecoilState(budgetState);
  // 총 예산 및 지출 계산
  const totalBudget = budgetedCategories.reduce(
    (sum, list) => sum + list.budget,
    0
  );
  const totalSpent = budgetedCategories.reduce(
    (sum, list) => sum + list.spent,
    0
  );
  const remainingBudget = totalBudget - totalSpent;
  const budgetProgress = Math.round((totalSpent / totalBudget) * 100);

  const { methods, isOpen, openModal, closeModal } =
    useModalFormArray<BudgetFormInput>(initialBudget());

  const handleSaveBudget = async (budgetItems: BudgetSubmitInput[]) => {
    for (const item of budgetItems) {
      await updateItem<BudgetSubmitInput>(
        "categories",
        item,
        userId!,
        (saved: BudgetSubmitInput) => {
          setBudget((prev) => patchItem(prev, saved));
        }
      );
    }

    await refetch();
  };

  const handleDelBudget = async (id: number) => {
    const deleteItem = {
      id,
      budget: 0,
      budgetYn: false,
    };
    console.log(deleteItem);
    await updateItem<BudgetSubmitInput>(
      "categories",
      deleteItem,
      userId!,
      (saved: BudgetSubmitInput) => {
        setBudget((prev) => patchItem(prev, saved));
      }
    );

    await refetch();
  };

  const handleClickAdd = () => {
    openModal();
  };

  const handleClickEdit = ({ categoryId, budget }: BudgetFormInput) => {
    openModal([{ categoryId, budget }]);
  };

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

          <Button variant="saveBtn" onClick={handleClickAdd}>
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            예산 추가
          </Button>
        </div>
      </ContentHeader>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 space-y-6">
        <AnimatePresence mode="wait">
          {budgetedCategories.length > 0 ? (
            <motion.div
              key="budget-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* 기간 선택 및 요약 정보 */}
              <SummarySection
                totalBudget={totalBudget}
                budgetLen={budgetedCategories.length}
                totalSpent={totalSpent}
                budgetProgress={budgetProgress}
                remainingBudget={remainingBudget}
              />

              {/* 전체 예산 진행 상황 */}
              <UsageProgress
                budgetProgress={budgetProgress}
                totalSpent={totalSpent}
                totalBudget={totalBudget}
              />

              {/* 카테고리별 예산 */}
              <CardSection title={"카테고리별 예산"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {budgetedCategories.map((category) => {
                    const progress = Math.round(
                      (category.spent / category.budget) * 100
                    );
                    const diffAmount = category.budget - category.spent;

                    return (
                      <BudgetCategoryItem
                        key={category.categoryId}
                        budget={category}
                        progress={progress}
                        diffAmount={diffAmount}
                        openModal={() => handleClickEdit(category)}
                        onDelete={handleDelBudget}
                      />
                    );
                  })}
                </div>
              </CardSection>

              {/* 예산 조언 */}
              {/* <Advice /> */}
            </motion.div>
          ) : typeof firstExpenseYear === "number" &&
            !isNaN(firstExpenseYear) ? (
            <EmptyFilterBudgetNotice
              openModal={handleClickAdd}
              toggleDateSelector={toggleDateSelector}
              selectedDate={selectedDate}
            />
          ) : (
            <EmptyBudgetNotice openModal={handleClickAdd} />
          )}
        </AnimatePresence>
      </div>

      {/* 예산 추가 모달 */}
      <FormProvider {...methods}>
        <AddBudgetModal
          isOpen={isOpen}
          onClose={closeModal}
          onSave={handleSaveBudget}
          categories={categories}
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
