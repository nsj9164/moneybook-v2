import { Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ExpensesHeaderProps {
  chkListCnt: number;
  handleDelExpenses: () => void;
}

export const ExpensesHeader = ({
  chkListCnt,
  handleDelExpenses,
}: ExpensesHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
        지출 관리
      </h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/expenses/edit"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="mr-2 -ml-1 h-4 w-4" />
          지출 추가
        </Link>
        <button
          type="button"
          onClick={() => handleButton("")}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-emerald-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          <Pencil className="mr-2 -ml-1 h-4 w-4" />
          지출 수정
        </button>
        <button
          type="button"
          onClick={() => handleDelExpenses()}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          <Trash2 className="mr-2 -ml-1 h-4 w-4" />
          선택 삭제 ({chkListCnt})
        </button>
      </div>
    </div>
  );
};
