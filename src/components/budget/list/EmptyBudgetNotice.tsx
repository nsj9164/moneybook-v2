import {
  BarChart3,
  DollarSign,
  PieChart,
  Plus,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

interface EmptyBudgetNoticeProps {
  openModal: () => void;
}

export const EmptyBudgetNotice = ({ openModal }: EmptyBudgetNoticeProps) => {
  return (
    <motion.div
      key="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-emerald-50 rounded-full p-6 mb-6">
        <DollarSign className="h-12 w-12 text-emerald-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        아직 설정된 예산이 없어요
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        카테고리별 예산을 설정하면 지출을 효과적으로 관리하고 재정 목표를
        달성하는 데 도움이 됩니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center text-center">
          <div className="bg-blue-50 rounded-full p-3 mb-3">
            <PieChart className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">지출 분석</h3>
          <p className="text-xs text-gray-500">
            카테고리별 지출 패턴을 파악하세요
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center text-center">
          <div className="bg-purple-50 rounded-full p-3 mb-3">
            <BarChart3 className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">예산 관리</h3>
          <p className="text-xs text-gray-500">
            카테고리별 예산 한도를 설정하세요
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center text-center">
          <div className="bg-amber-50 rounded-full p-3 mb-3">
            <TrendingUp className="h-6 w-6 text-amber-500" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">목표 달성</h3>
          <p className="text-xs text-gray-500">
            재정 목표를 설정하고 달성하세요
          </p>
        </div>
      </div>

      <button
        onClick={openModal}
        className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-emerald-700 transition-colors"
      >
        <Plus className="mr-2 h-5 w-5" />첫 예산 설정하기
      </button>
    </motion.div>
  );
};
