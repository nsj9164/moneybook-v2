import { useEffect } from "react";
import { ICategory, IPayMethod } from "@/types/expense-types";
import { useFormContext } from "react-hook-form";
import { useCycleOptions } from "../hooks/useCycleOptions";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { addMonths, format, getMonth, getYear, setDate } from "date-fns";

interface RecurringModalFieldsProps {
  categories: ICategory[];
  payMethods: IPayMethod[];
}
export const RecurringModalFields = ({
  categories,
  payMethods,
}: RecurringModalFieldsProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const isActive = watch("isActive");
  const cycleOptions = useCycleOptions();

  useEffect(() => {
    const billingStartDate = new Date(watch("billingStartDate"));
    const paymentDay = watch("paymentDay");

    let nextPaymentDate = setDate(billingStartDate, paymentDay);

    if (billingStartDate >= nextPaymentDate)
      nextPaymentDate = addMonths(nextPaymentDate, 1);

    setValue("nextPaymentDate", format(nextPaymentDate, "yyyy-MM-dd"));
  }, [watch("billingStartDate"), watch("paymentDay")]);
  return (
    <>
      <InputField label="지출 항목" name="name" type="text" required={true} />

      {/* min은? */}
      <InputField
        label="금액"
        name="amount"
        type="number"
        required={true}
        min={0}
        placeholder="0"
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="카테고리"
          name="categoryId"
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
          required={true}
        />

        <SelectField
          label="결제수단"
          name="paymentMethodId"
          options={payMethods.map((p) => ({ label: p.name, value: p.id }))}
          required={true}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="반복 주기"
          name="cycle"
          options={cycleOptions}
          required={true}
        />

        <InputField
          label="결제일"
          name="paymentDay"
          type="number"
          required={true}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="시작일"
          name="billingStartDate"
          type="date"
          required={true}
        />

        <InputField
          label="종료일 (선택사항)"
          name="billingEndDate"
          type="date"
          required={true}
        />
      </div>

      <div>
        <label
          htmlFor="note"
          className="block text-sm font-medium text-gray-700"
        >
          메모 (선택사항)
        </label>
        <textarea
          {...register("note")}
          id="note"
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          placeholder="추가 정보를 입력하세요"
        />
      </div>

      <div className="flex items-center">
        <input
          {...register("isActive")}
          id="isActive"
          type="checkbox"
          checked={isActive}
          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          활성화
        </label>
      </div>
    </>
  );
};
