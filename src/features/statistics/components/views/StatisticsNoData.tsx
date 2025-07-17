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
              {selectedMonth}월 데이터가 아직 없어요
            </h3>
            <p className="text-amber-700 mb-4">
              이번 달 지출을 기록하면 지난 달과 비교한 상세한 통계를 볼 수
              있어요. 지금까지의 데이터를 바탕으로 이번 달 예상 지출을
              확인해보세요.
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
                onClick={() => setSelectedMonth("6")}
                className="inline-flex items-center px-4 py-2 bg-white text-amber-700 text-sm font-medium rounded-lg border border-amber-300 hover:bg-amber-50 transition-colors"
              >
                지난 달 보기 (6월)
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 지난 달 데이터 기반 예상 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                {formatCurrency(3200000)}
              </h3>
              <div className="mt-1">
                <span className="text-xs text-gray-400">지난 달 기준</span>
              </div>
            </div>
          </div>
        </div>

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

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PieChart className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">예상 저축</p>
              <h3 className="text-2xl font-bold text-gray-400">
                {formatCurrency(3200000)}
              </h3>
              <div className="mt-1">
                <span className="text-xs text-gray-400">지출 기록 후 계산</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">예상 저축률</p>
              <h3 className="text-2xl font-bold text-gray-400">100%</h3>
              <div className="mt-1">
                <span className="text-xs text-gray-400">지출 기록 후 계산</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 지난 달 데이터 표시 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              지난 달 데이터 (6월)
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-600">데이터 있음</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                {formatCurrency(2750000)}
              </div>
              <div className="text-sm text-emerald-700">6월 총 지출</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formatCurrency(450000)}
              </div>
              <div className="text-sm text-blue-700">6월 저축액</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                14.1%
              </div>
              <div className="text-sm text-purple-700">6월 저축률</div>
            </div>
          </div>
        </div>
      </div>

      {/* 지난 달 카테고리별 지출 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            지난 달 카테고리별 지출 (6월)
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {currentMonthCategories.map((category, index) => (
              <div
                key={category.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 ${category.color} rounded mr-3`}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">
                    {formatCurrency(category.lastMonth)}
                  </div>
                  <div className="text-xs text-gray-500">지난 달</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 이번 달 목표 설정 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            이번 달 목표를 세워보세요!
          </h3>
          <p className="text-blue-700 mb-6">
            지난 달 데이터를 참고해서 {selectedMonth}월 지출 목표를 설정하고
            계획적인 소비를 시작해보세요.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-lg font-bold text-gray-900 mb-1">
                지난 달 대비 10% 절약
              </div>
              <div className="text-sm text-gray-600">
                목표: {formatCurrency(2750000 * 0.9)}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-lg font-bold text-gray-900 mb-1">
                저축률 20% 달성
              </div>
              <div className="text-sm text-gray-600">
                목표: {formatCurrency(3200000 * 0.2)}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-lg font-bold text-gray-900 mb-1">
                식비 30만원 이하
              </div>
              <div className="text-sm text-gray-600">
                지난 달: {formatCurrency(450000)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
