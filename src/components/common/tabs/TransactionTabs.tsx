import { FilterTab } from "@/features/transactions/types/filters";

interface TransactionTabsProps {
  activeTab: string;
  toggleTab: (tab: FilterTab) => void;
}

export const TransactionTabs = ({
  activeTab,
  toggleTab,
}: TransactionTabsProps) => {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => {
              toggleTab("expense");
            }}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "expense"
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            지출 관리
          </button>
          <button
            onClick={() => {
              toggleTab("income");
            }}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "income"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            수입 관리
          </button>
        </nav>
      </div>
    </div>
  );
};
