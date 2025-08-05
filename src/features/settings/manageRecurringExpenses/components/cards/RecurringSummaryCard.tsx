import { formatCurrency } from "@/utils/format";

interface RecurringSummaryCardProps {
  activeLen: number;
  totalMonthly: number;
}
export const RecurringSummaryCard = ({
  activeLen,
  totalMonthly,
}: RecurringSummaryCardProps) => {
  return (
    <div className="mb-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            월간 고정지출 요약
          </h3>
          <p className="text-sm text-gray-500">
            활성화된 고정지출 {activeLen}개
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <p className="text-sm text-gray-500">
            총 월간 고정지출:{" "}
            <span className="font-medium text-gray-900">
              {formatCurrency(totalMonthly)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
