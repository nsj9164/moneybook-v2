import { ArrowLeft, Plus, Save } from "lucide-react";

interface EditHeaderProps {
  handleAddExpense: () => void;
  handleSaveExpense: () => void;
}
export const EditHeader = ({
  handleAddExpense,
  handleSaveExpense,
}: EditHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="flex items-center mb-4 sm:mb-0">
        <button
          type="button"
          className="mr-3 p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">뒤로 가기</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">지출 추가</h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddExpense}
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="mr-2 -ml-1 h-4 w-4" />새 항목 추가
        </button>
        <button
          onClick={handleSaveExpense}
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          <Save className="mr-2 -ml-1 h-4 w-4" />
          모두 저장
        </button>
      </div>
    </div>
  );
};
