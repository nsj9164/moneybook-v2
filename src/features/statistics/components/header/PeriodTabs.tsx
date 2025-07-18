interface PeriodTabsProps {
  selectedPeriod: "month" | "year";
  togglePeriod: (period: "month" | "year") => void;
}

export const PeriodTabs = ({
  selectedPeriod,
  togglePeriod,
}: PeriodTabsProps) => {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <button
        className={`px-4 py-2 text-sm font-medium ${
          selectedPeriod === "month"
            ? "bg-emerald-50 text-emerald-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => togglePeriod("month")}
      >
        월간
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium ${
          selectedPeriod === "year"
            ? "bg-emerald-50 text-emerald-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => togglePeriod("year")}
      >
        연간
      </button>
    </div>
  );
};
