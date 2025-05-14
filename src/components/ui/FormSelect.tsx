import { ICategory, IPayMethod } from "@/types/expense-types";

interface FormSelectProps {
  id: string;
  label: string;
  dataList: ICategory[] | IPayMethod[];
}

export const FormSelect = ({ id, label, dataList }: FormSelectProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        defaultValue="전체"
      >
        {dataList.map((data) => (
          <option key={data.id} value={data.id}>
            {data.name}
          </option>
        ))}
      </select>
    </div>
  );
};
