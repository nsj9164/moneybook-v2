import { motion } from "framer-motion";
import {
  AlertCircle,
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Plus,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardNoDataProps {
  selectedMonth: number;
  showDateSelector: boolean;
  toggleDateSelector: () => void;
  handleChangeMonth: (month: number) => void;
}
export const DashboardNoData = ({
  selectedMonth,
  showDateSelector,
  toggleDateSelector,
  handleChangeMonth,
}: DashboardNoDataProps) => {
  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
            <p className="mt-1 text-sm text-gray-500">
              한눈에 보는 나의 재정 현황
            </p>
          </div>
          <div className="relative">
            <button
              className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={toggleDateSelector}
            >
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              2023년 {selectedMonth}월
              <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
            </button>

            {showDateSelector && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 w-64">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <button
                      key={month}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedMonth === month
                          ? "bg-emerald-100 text-emerald-700 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleChangeMonth(month)}
                    >
                      {month}월
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/expenses/add"
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            거래 추가
          </Link>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6">
        {/* 빈 상태 메시지 */}
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="h-10 w-10 text-gray-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2023년 {selectedMonth}월 데이터가 없습니다
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            이번 달에 등록된 거래 내역이 없어요. 첫 거래를 추가하여 가계부
            관리를 시작해보세요.
          </p>

          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/expenses/add"
              className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              <Plus className="mr-2 h-5 w-5" />
              이번 달 첫 거래 추가하기
            </Link>
            <button
              //   onClick={() => handleMonthChange("6")}
              className="inline-flex items-center border border-gray-300 bg-white px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              지난 달 데이터 보기 (6월)
            </button>
          </div>
        </div>

        {/* 빠른 액션 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <Link to="/expenses/add" className="block">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    지출 추가
                  </h3>
                  <p className="text-sm text-gray-600">
                    오늘의 지출을 빠르게 기록하세요
                  </p>
                </div>
                <div className="bg-emerald-100 rounded-lg p-3">
                  <Plus className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <Link to="/budget" className="block">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    예산 설정
                  </h3>
                  <p className="text-sm text-gray-600">
                    이번 달 예산을 계획해보세요
                  </p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <Link to="/statistics" className="block">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    지출 통계
                  </h3>
                  <p className="text-sm text-gray-600">
                    이전 달 데이터를 분석해보세요
                  </p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* 도움말 섹션 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-blue-800">
                가계부 관리 팁
              </h3>
              <p className="mt-1 text-sm text-blue-700 mb-4">
                매일 조금씩이라도 지출을 기록하는 습관을 만들어보세요. 작은
                지출도 모이면 큰 금액이 됩니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  💡 매일 기록하기
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  📊 주간 리뷰하기
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  🎯 목표 설정하기
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
