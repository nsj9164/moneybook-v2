import { IFilters } from "@/pages/Expenses";
import { ICategory, IPayMethod } from "@/types/expense-types";

interface FormSelectProps {
  id: string;
  label: string;
  dataList: ICategory[] | IPayMethod[];
  filtersValue: number;
  field: keyof IFilters;
  onChange: (field: keyof IFilters, value: number) => void;
}

export const FormSelect = ({
  id,
  label,
  dataList,
  filtersValue,
  field,
  onChange,
}: FormSelectProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        defaultValue="0"
        value={filtersValue}
        onChange={(e) => onChange(field, Number(e.target.value))}
      >
        <option value="0">전체</option>
        {dataList.map((data) => (
          <option key={data.id} value={data.id}>
            {data.name}
          </option>
        ))}
      </select>
    </div>
  );
};
