import { Bell, Calendar, ChevronDown, Plus, Search } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-900">재정 대시보드</h1>
        <div className="relative">
          <button
            className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setShowMonthSelector(!showMonthSelector)}
          >
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            2023년 {selectedMonth}월
            <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
          </button>

          {showMonthSelector && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 w-64">
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <button
                    key={month}
                    className={`px-3 py-2 text-sm rounded-md ${
                      selectedMonth === month.toString()
                        ? "bg-emerald-100 text-emerald-700 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setSelectedMonth(month.toString());
                      setShowMonthSelector(false);
                    }}
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
        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <Search className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <button className="flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg transition-colors">
          <Plus className="h-4 w-4" />
          <span className="font-medium">지출 추가</span>
        </button>
      </div>
    </div>
  );
};
