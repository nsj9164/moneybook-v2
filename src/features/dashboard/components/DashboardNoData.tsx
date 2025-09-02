import { motion } from "framer-motion";
import { AlertCircle, Calendar, ChevronLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { actionCards } from "../constants/noDataActions";
import { getPreviousMonth } from "@/utils/getPreviousMonth";

interface DashboardNoDataProps {
  selectedDate: { year: number; month: number };
  goBackOneMonth: (year: number, month: number) => void;
}
export const DashboardNoData = ({
  selectedDate,
  goBackOneMonth,
}: DashboardNoDataProps) => {
  const { year, month } = selectedDate;

  return (
    <div className="p-6">
      {/* 빈 상태 메시지 */}
      <div className="text-center py-16">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <Calendar className="h-10 w-10 text-gray-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {year}년 {month}월 데이터가 없습니다
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          이번 달에 등록된 거래 내역이 없어요. <br />첫 거래를 추가하여 가계부
          관리를 시작해보세요.
        </p>

        {/* 액션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            to="/expenses/edit"
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Plus className="mr-2 h-5 w-5" />
            이번 달 첫 거래 추가하기
          </Link>
          <button
            onClick={() => goBackOneMonth(year, month)}
            className="inline-flex items-center border border-gray-300 bg-white px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            지난 달 데이터 보기 ({getPreviousMonth(month)}월)
          </button>
        </div>
      </div>

      {/* 빠른 액션 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {actionCards.map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: card.delay }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <Link to={card.to} className="block">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                  <div className={`${card.iconBg} rounded-lg p-3`}>
                    <Icon className={`h-6 w-6 ${card.iconColor}`} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
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
              매일 조금씩이라도 지출을 기록하는 습관을 만들어보세요. 작은 지출도
              모이면 큰 금액이 됩니다.
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
  );
};
