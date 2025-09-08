interface DateSelectorProps {
  selectedDate: { year: number; month: number };
  years: number[];
  handleChangeYear: (year: number) => void;
  handleChangeMonth: (month: number) => void;
}

export const DateSelector = ({
  selectedDate,
  years,
  handleChangeYear,
  handleChangeMonth,
}: DateSelectorProps) => {
  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10 min-w-[280px]">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">연도 선택</h4>
          <select
            value={selectedDate.year}
            onChange={(e) => handleChangeYear(Number(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}년
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">월 선택</h4>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <button
                key={month}
                className={`px-3 py-2 text-sm rounded-md ${
                  selectedDate.month === month
                    ? "bg-emerald-100 text-emerald-700 font-medium"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  handleChangeMonth(month);
                }}
              >
                {month}월
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
