import { motion } from "framer-motion";
import { ArrowRight, Calendar, Info, Plus, Search } from "lucide-react";

interface EmptyFilterProps {
  openModal: () => void;
  toggleDateSelector: () => void;
  selectedDate: { year: number; month: number };
}

export const EmptyFilterBudgetNotice = ({
  openModal,
  toggleDateSelector,
  selectedDate,
}: EmptyFilterProps) => {
  return (
    <motion.div
      key="no-data-for-period"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-blue-50 rounded-full p-6 mb-6">
        <Search className="h-12 w-12 text-blue-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {selectedDate.year}년 {selectedDate.month}월 예산 데이터가 없어요
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-6">
        선택하신 기간에 설정된 예산이 없습니다. <br />
        새로운 예산을 추가하거나 다른 기간을 선택해보세요.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-emerald-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />이 달 예산 설정하기
        </button>
        <button
          onClick={toggleDateSelector}
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Calendar className="mr-2 h-4 w-4" />
          다른 기간 선택하기
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 max-w-md">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              이전 예산 복사하기
            </h3>
            <p className="mt-1 text-xs text-blue-700">
              이전 달의 예산을 복사하여 빠르게 설정할 수도 있습니다.
              <br />
              필요한 부분만 수정하면 됩니다.
            </p>
            <button className="mt-2 text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center">
              이전 예산 불러오기
              <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
