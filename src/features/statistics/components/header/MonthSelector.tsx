import { Calendar, ChevronDown } from "lucide-react";

export const MonthSelector = () => {
  return (
    <div className="relative">
      <button
        className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        onClick={() => setShowMonthSelector(!showMonthSelector)}
      >
        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
        {selectedYear}년 {selectedMonth}월
        <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
      </button>

      {showMonthSelector && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <button
                key={month}
                className={`px-3 py-2 text-sm rounded-md ${
                  selectedMonth === month.toString()
                    ? "bg-emerald-100 text-emerald-700 font-medium"
                    : "hover:bg-gray-100"
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
  );
};
