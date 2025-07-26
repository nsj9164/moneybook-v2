import { OverviewSummary } from "@/types/OverviewSummary";
import { motion } from "framer-motion";
import { AlertCircle, Plus } from "lucide-react";
import { NoDataOverviewSummary } from "../layout/NoDataOverviewSummary";
import { getPreviousMonth } from "@/utils/getPreviousMonth";

interface StatisticsNoDataProps {
  selectedDate: { year: number; month: number };
  summaryData: OverviewSummary;
  goBackOneMonth: (year: number, month: number) => void;
}

export const StatisticsNoData = ({
  selectedDate,
  summaryData,
  goBackOneMonth,
}: StatisticsNoDataProps) => {
  const { year, month } = selectedDate;

  return (
    <div className="space-y-6">
      {/* 알림 배너 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">
              {month}월 데이터가 아직 없어요
            </h3>
            <p className="text-amber-700 mb-4">
              이번 달 지출을 기록하면 지난달과 비교한 상세 통계를 확인할 수
              있어요. 지금 바로 시작해보세요!
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  console.log("지출 추가 페이지로 이동");
                }}
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                지출 추가하기
              </button>
              <button
                onClick={() => goBackOneMonth(year, month)}
                className="inline-flex items-center px-4 py-2 bg-white text-amber-700 text-sm font-medium rounded-lg border border-amber-300 hover:bg-amber-50 transition-colors"
              >
                지난 달 보기 ({getPreviousMonth(month)}월)
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 예상 통계 또는 데이터 없음 표시 */}
      <NoDataOverviewSummary summaryData={summaryData} />
    </div>
  );
};
