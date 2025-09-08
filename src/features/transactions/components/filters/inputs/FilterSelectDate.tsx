interface FilterDateRangeProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterDateRange = ({
  label,
  name,
  value,
  onChange,
}: FilterDateRangeProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
      />
    </div>
  );
};
