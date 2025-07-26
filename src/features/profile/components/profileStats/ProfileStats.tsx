import { formatCurrency } from "@/utils/format";
import { UserTotalSummary } from "../../types/TotalSummary";
import { ProfileStatsCard } from "./ProfileStatsCard";

export const ProfileStats = ({
  totalSummary,
}: {
  totalSummary: UserTotalSummary;
}) => {
  const { totalExpenseCount, totalExpenseAmount, averageMonthlyExpense } =
    totalSummary;
  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">사용 통계</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileStatsCard
          title="총 지출 기록"
          desc={`${totalExpenseCount}건`}
        />

        <ProfileStatsCard
          title="총 지출 금액"
          desc={`${formatCurrency(totalExpenseAmount)}원`}
        />

        <ProfileStatsCard
          title="평균 월 지출"
          desc={`${formatCurrency(averageMonthlyExpense)}원`}
        />
      </div>
    </div>
  );
};
