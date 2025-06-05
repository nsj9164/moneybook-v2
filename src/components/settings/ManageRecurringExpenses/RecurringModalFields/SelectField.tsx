import { useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: number | string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: Option[];
  required?: boolean;
}

export const SelectField = ({
  label,
  name,
  options,
  required = false,
}: SelectFieldProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        {...register(name, { required })}
        id={name}
        name={name}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
      >
        <option value="0">선택</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
