import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import AddBudgetModal from "@/components/budget/AddBudgetModal";
import NotificationModal from "@/components/common/modal/NotificationModal";
import { useNotification } from "@/hooks/useNotification";
import { ContentHeader } from "@/components/common/layout/ContentHeader";
import { UsageProgress } from "@/components/budget/sections/UsageProgress";
import { CategoryItem } from "@/components/budget/sections/BudgetItem";
import { Advice } from "@/components/budget/sections/Advice";
import { useCategoryStats } from "@/hooks/useCategoryStats";
import { CardSection } from "@/components/common/layout/CardSection";
import { Button } from "@/components/ui/Button";
import { DateFilterControl } from "@/components/budget/DateFilterControl";
import { SummarySection } from "@/components/budget/sections/SummarySection";
import { useFirstExpenseYear } from "@/hooks/useFirstExpenseYear";
import { useModalForm } from "@/components/settings/hooks/useModalForm";
import { CategoryStatDisplay, CategoryStatInput } from "@/types";
import { useSetRecoilState } from "recoil";
import { budgetState } from "@/recoil/atoms";
import { useAuth } from "@/contexts/AuthContext";
import { updateItem } from "@/utils/crud";
import { patchItem } from "@/utils/patchItem";
import { BudgetItem } from "@/components/budget/BudgetItem";

const Budget = () => {
  const { userId } = useAuth();
  const { budgetList, budgetNList } = useCategoryStats();
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState({
    year: currentYear,
    month: new Date().getMonth(),
  });
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  const { notification, showSuccess, hideNotification } = useNotification();

  const setBudget = useSetRecoilState(budgetState);
  // 총 예산 및 지출 계산
  const totalBudget = budgetList.reduce((sum, list) => sum + list.budget, 0);
  const totalSpent = budgetList.reduce((sum, list) => sum + list.spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetProgress = Math.round((totalSpent / totalBudget) * 100);

  const handleAddBudget = (budgetItems: any[]) => {
    // 여기서 실제로는 API 호출이나 상태 업데이트를 수행
    console.log("새 예산 항목들:", budgetItems);
    showSuccess(
      "예산 추가 완료",
      `${budgetItems.length}개의 예산이 성공적으로 추가되었습니다.`
    );
  };

  // 년도 목록 생성 (현재 년도 기준 ±5년)

  const { data: firstExpenseYear } = useFirstExpenseYear();
  const years = useMemo(() => {
    const startYear = firstExpenseYear ?? currentYear;
    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => startYear + i
    );
  }, [firstExpenseYear, currentYear]);

  const closeDateSelector = () => {
    setShowDateSelector(!showDateSelector);
  };

  const handleChangeYear = (year: number) => {
    setSelectedDate((prev) => ({ ...prev, year }));
  };

  const handleChangeMonth = (month: number) => {
    setSelectedDate((prev) => ({ ...prev, month }));
    setShowDateSelector(false);
  };

  // const { methods, isOpen, openModal, closeModal } =
  //   useModalForm<CategoryStatInput>(() => ({ id: 0, budget: 0 }));

  const handleSaveBudget = async (budgetItems: CategoryStatInput[]) => {
    for (const item of budgetItems) {
      await updateItem<CategoryStatDisplay>(
        "categories",
        item,
        userId!,
        (saved: CategoryStatDisplay) => {
          setBudget((prev) => patchItem(prev, saved));
        }
      );
    }
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
            closeDateSelector={closeDateSelector}
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
        {/* 기간 선택 및 요약 정보 */}
        <SummarySection
          totalBudget={totalBudget}
          budgetLen={budgetList.length}
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
            {budgetList.map((budget) => (
              <BudgetItem key={budget.id} budgetNList={budgetNList} />
            ))}
          </div>
        </CardSection>

        {/* 예산 조언 */}
        {/* <Advice /> */}
      </div>

      {/* 예산 추가 모달 */}
      <AddBudgetModal
        isOpen={isOpen}
        onClose={closeModal}
        onSave={handleSaveBudget}
        budgetNList={budgetNList}
      />

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
