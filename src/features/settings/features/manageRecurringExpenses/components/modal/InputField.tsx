import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
}

export const InputField = ({
  label,
  type = "text",
  name,
  placeholder,
  required = false,
  min,
}: InputFieldProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(name, { required, min })}
        type={type}
        id={name}
        name={name}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        placeholder={placeholder ?? `${label}을 입력하세요`}
      />
    </div>
  );
};
