interface FilterDateRangeProps {
  startDate: string;
  endDate: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterDateRange = ({
  startDate,
  endDate,
  onChange,
}: FilterDateRangeProps) => {
  return (
    <div>
      <label
        htmlFor="date-range"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        기간
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="date"
          id="start-date"
          name="startDate"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          value={startDate}
          onChange={onChange}
        />
        <span className="text-gray-500">~</span>
        <input
          type="date"
          id="end-date"
          name="endDate"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          value={endDate}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
