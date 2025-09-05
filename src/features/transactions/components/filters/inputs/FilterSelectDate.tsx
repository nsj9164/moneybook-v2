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
    <input
      type="date"
      value={endDate}
      onChange={(e) => {
        setEndDate(e.target.value);
        setSelectedMonth("");
        setQuickPeriod("");
      }}
      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
    />
  );
};
