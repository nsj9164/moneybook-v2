interface FilterCheckboxProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterCheckbox = ({
  label,
  name,
  value,
  onChange,
}: FilterCheckboxProps) => {
  return (
    <label className="inline-flex items-center">
      <input
        name={name}
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );
};
