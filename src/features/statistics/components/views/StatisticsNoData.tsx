import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Award,
  BarChart3,
  Calendar,
  Clock,
  Eye,
  PieChart,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";

export const StatisticsNoData = () => {
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
              {hasPrevData
                ? `${selectedMonth}월 데이터가 아직 없어요`
                : "선택된 기간의 데이터가 없어요"}
            </h3>
            <p className="text-amber-700 mb-4">
              {hasPrevData
                ? `이번 달 지출을 기록하면 지난 달과 비교한 상세한 통계를 볼 수 있어요. 지금까지의 데이터를 바탕으로 이번 달 예상 지출을 확인해보세요.`
                : `지출을 기록하면 상세한 통계를 확인할 수 있어요. 지금 바로 첫 지출을 추가해보세요!`}
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
              {hasPrevData && (
                <button
                  onClick={() => {
                    setSelectedMonth("6"); // 지난 달 보기
                    setHasCurrentMonthData(true); // 지난 달은 데이터 있다고 가정
                  }}
                  className="inline-flex items-center px-4 py-2 bg-white text-amber-700 text-sm font-medium rounded-lg border border-amber-300 hover:bg-amber-50 transition-colors"
                >
                  지난 달 보기 (6월)
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 예상 통계 또는 데이터 없음 표시 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 수입 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">예상 월 수입</p>
              <h3 className="text-2xl font-bold text-gray-400">
                {hasPrevData ? formatCurrency(3200000) : "₩0"}
              </h3>
              <div className="mt-1">
                <span className="text-xs text-gray-400">
                  {hasPrevData ? "지난 달 기준" : "데이터 없음"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 지출 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">현재 지출</p>
              <h3 className="text-2xl font-bold text-gray-900">₩0</h3>
              <div className="mt-1">
                <span className="text-xs text-amber-600">데이터 없음</span>
              </div>
            </div>
          </div>
        </div>

        {/* 저축 금액 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PieChart className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">
                예상 저축 금액
              </p>
              <h3 className="text-2xl font-bold text-gray-400">
                {hasPrevData ? formatCurrency(3200000) : "₩0"}
              </h3>
              <div className="mt-1">
                <span className="text-xs text-gray-400">지출 기록 후 계산</span>
              </div>
            </div>
          </div>
        </div>

        {/* 예상 달성률 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">예상 달성률</p>
              <h3 className="text-2xl font-bold text-gray-400">0%</h3>
              <div className="mt-1">
                <div className="text-xs text-gray-500 mb-1">
                  목표:{" "}
                  {hasPrevData ? formatCurrency(MONTHLY_BUDGET_GOAL) : "₩0"}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `0%` }}
                    transition={{ duration: 0.5 }}
                    className="h-2 rounded-full bg-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
