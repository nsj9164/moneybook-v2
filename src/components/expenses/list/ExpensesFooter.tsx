import { Download } from "lucide-react";

export const ExpensesFooter = () => {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center">
        <p className="text-sm text-gray-700">
          {/* 총 <span className="font-medium">{expenses.length}</span> 항목 */}
        </p>
      </div>
      <div className="mt-4 sm:mt-0">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <Download className="mr-2 -ml-1 h-4 w-4" />
          내보내기
        </button>
      </div>
    </div>
  );
};
