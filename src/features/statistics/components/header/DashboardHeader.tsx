import { PageHeader } from "@/components/common/layout/PageHeader";
import { DateFilterControl } from "@/components/monthSelector/DateFilterControl";
import { PeriodTabs } from "./PeriodTabs";

interface DashboardHeaderProps {
  selectedPeriod: "month" | "year";
  dateFilter: {
    selectedDate: { year: number; month: number };
    showDateSelector: boolean;
    years: number[];
    toggleDateSelector: () => void;
    handleChangeYear: (year: number) => void;
    handleChangeMonth: (month: number) => void;
  };
  togglePeriod: (period: "month" | "year") => void;
}

export const DashboardHeader = ({
  selectedPeriod,
  dateFilter,
  togglePeriod,
}: DashboardHeaderProps) => {
  const {
    selectedDate,
    showDateSelector,
    years,
    toggleDateSelector,
    handleChangeMonth,
    handleChangeYear,
  } = dateFilter;

  return (
    <PageHeader
      title="지출 통계"
      description={
        selectedPeriod === "month"
          ? "월간 지출 패턴을 분석하고 무지출 캘린더를 확인하세요."
          : "연간 재정 상태를 분석하고 소비 패턴을 확인하세요."
      }
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

        <PeriodTabs
          selectedPeriod={selectedPeriod}
          togglePeriod={togglePeriod}
        />
      </div>
    </PageHeader>
  );
};
