interface TransactionTabsProps {
  selectedTab: string;
  toggleTab: (tab: string) => void;
}

export const TransactionTabs = ({
  selectedTab,
  toggleTab,
}: TransactionTabsProps) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => toggleTab("")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              selectedTab === ""
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            전체
          </button>
          <button
            onClick={() => toggleTab("expense")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              selectedTab === "expense"
                ? "bg-white text-red-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            지출
          </button>
          <button
            onClick={() => toggleTab("income")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              selectedTab === "income"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            수입
          </button>
        </div>
      </div>
    </div>
  );
};
