"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import AddBudgetModal from "@/components/budget/AddBudgetModal";
import NotificationModal from "@/components/common/modal/NotificationModal";
import { useNotification } from "@/hooks/useNotification";
import { ContentHeader } from "@/components/common/layout/ContentHeader";
import { UsageProgress } from "@/components/budget/sections/UsageProgress";
import { CategoryItem } from "@/components/budget/sections/CategoryItem";
import { Advice } from "@/components/budget/sections/Advice";
import { SummaryCard } from "@/components/budget/SummaryCard";
import { useCategoryStats } from "@/hooks/useCategoryStats";
import { CardSection } from "@/components/common/layout/CardSection";

const Budget = () => {
  const budgetCategories = useCategoryStats();
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("6");
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  const { notification, showSuccess, hideNotification } = useNotification();

  // 총 예산 및 지출 계산
  const totalBudget = budgetCategories.reduce(
    (sum, category) => sum + category.budget,
    0
  );
  const totalSpent = budgetCategories.reduce(
    (sum, category) => sum + category.spent,
    0
  );
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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <ContentHeader
        title="예산 계획"
        desc="카테고리별 예산을 설정하고 지출을 체계적으로 관리하세요."
      >
        <button
          type="button"
          onClick={() => setIsAddBudgetModalOpen(true)}
          className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
        >
          <Plus className="mr-2 -ml-1 h-4 w-4" />
          예산 추가
        </button>
      </ContentHeader>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 space-y-6">
        {/* 기간 선택 및 요약 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title={"총 예산"}
            value={formatCurrency(totalBudget) ?? 0}
            colorClass={"text-gray-900"}
            footerLabel={"카테고리"}
            footerValue={`${budgetCategories.length}개`}
          />

          <SummaryCard
            title={"사용 금액"}
            value={formatCurrency(totalSpent) ?? 0}
            colorClass={"text-red-600"}
            footerLabel={"예산 대비"}
            footerValue={`${budgetProgress}%`}
            progressClass={`${
              budgetProgress > 100 ? "bg-red-500" : "bg-emerald-500"
            }`}
            progress={`${Math.min(budgetProgress, 100)}%`}
          />

          <SummaryCard
            title={"남은 예산"}
            value={formatCurrency(remainingBudget)}
            colorClass={"text-emerald-600"}
            footerLabel={"남은 일수"}
            footerValue={"15일"}
            progressClass={`${
              budgetProgress > 100 ? "bg-red-500" : "bg-emerald-500"
            }`}
            progress={"50%"}
          >
            <p className="text-xs text-gray-500 mt-2">
              하루 평균 {formatCurrency(remainingBudget / 15)} 사용 가능
            </p>
          </SummaryCard>
        </div>

        {/* 전체 예산 진행 상황 */}
        <UsageProgress
          budgetProgress={budgetProgress}
          totalSpent={totalSpent}
          totalBudget={totalBudget}
        />

        {/* 카테고리별 예산 */}
        <CardSection title={"카테고리별 예산"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {budgetCategories.map((category) => (
              <CategoryItem category={category} />
            ))}
          </div>
        </CardSection>

        {/* 예산 조언 */}
        <Advice />
      </div>

      {/* 예산 추가 모달 */}
      <AddBudgetModal
        isOpen={isAddBudgetModalOpen}
        onClose={() => setIsAddBudgetModalOpen(false)}
        onSave={handleAddBudget}
        existingBudgets={budgetCategories.map((cat) => ({
          id: cat.id.toString(),
          categoryId: cat.id.toString(),
          amount: cat.budget,
          period: "monthly" as const,
        }))}
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
