import { CategorySaved, PayMethodSaved } from "@/types";
import { ChevronDown } from "lucide-react";

interface FilterSelectProps {
  label: string;
  name: string;
  value: number;
  options: CategorySaved[] | PayMethodSaved[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FilterSelect = ({
  label,
  name,
  value,
  options,
  onChange,
}: FilterSelectProps) => {
  return (
    <div>
      <label
        htmlFor="filterCategory"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm appearance-none pr-8"
          value={value}
          onChange={onChange}
        >
          <option value={0}>전체</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
