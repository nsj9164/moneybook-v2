import { Plus } from "lucide-react";
import { FilterTab } from "../../types/filters";

export const ListHeader = ({ activeTab }: { activeTab: FilterTab }) => {
  return (
    <div className="bg-white border-b py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">거래 관리</h1>
          <p className="mt-1 text-sm text-gray-500">
            수입과 지출을 관리하고 분석하세요
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="mr-2 -ml-1 h-4 w-4" />
          {activeTab === "expense" ? "지출 추가" : "수입 추가"}
        </button>
      </div>
    </div>
  );
};
