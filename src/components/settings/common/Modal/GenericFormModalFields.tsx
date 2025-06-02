import { Check } from "lucide-react";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { FieldConfig } from "../../types/GenericFormTypes";

interface ModalFieldsProps {
  formTitle: string;
  fieldConfigs: FieldConfig[];
}

export function GenericFormModalFields({
  formTitle,
  fieldConfigs,
}: ModalFieldsProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const formValues = watch();

  return (
    <>
      {fieldConfigs.map((field) => {
        const fieldValue = formValues[field.name];

        if (field.type === "text") {
          return (
            <div key={field.name}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                {...register(field.name)}
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                placeholder={`${formTitle}명을 입력하세요`}
              />
            </div>
          );
        }

        if (field.type === "emoji") {
          return (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <div className="mt-1 grid grid-cols-10 gap-2">
                {field.options?.map((emoji) => {
                  // const isSelected = fieldValue === emoji;
                  const isSelected = fieldValue === emoji;
                  return (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setValue(field.name, emoji)}
                      className={`flex h-8 w-8 items-center justify-center rounded-md text-lg ${
                        isSelected
                          ? "bg-emerald-100 ring-2 ring-emerald-500"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <span role="img" aria-label={`아이콘 ${emoji}`}>
                        {emoji}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        if (field.type === "color") {
          return (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <div className="mt-1 grid grid-cols-5 gap-2">
                {field.options.map((color) => {
                  const isSelected = fieldValue === color.value;
                  return (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setValue(field.name, color.value)}
                      className={`flex h-8 w-full items-center justify-center rounded-md ${
                        isSelected
                          ? "ring-2 ring-offset-2 ring-emerald-500"
                          : ""
                      }`}
                      style={{ backgroundColor: color.value }}
                    >
                      {isSelected && <Check className="h-5 w-5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        return null;
      })}
    </>
  );
}
