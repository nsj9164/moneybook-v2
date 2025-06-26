export const PeriodTabs = () => {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <button
        className={`px-4 py-2 text-sm font-medium ${
          selectedPeriod === "month"
            ? "bg-emerald-50 text-emerald-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setSelectedPeriod("month")}
      >
        월간
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium ${
          selectedPeriod === "quarter"
            ? "bg-emerald-50 text-emerald-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setSelectedPeriod("quarter")}
      >
        분기
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium ${
          selectedPeriod === "year"
            ? "bg-emerald-50 text-emerald-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setSelectedPeriod("year")}
      >
        연간
      </button>
    </div>
  );
};
