import { ICategory, IPayMethod, IRecurring } from "@/types/expense-types";
import { format, getDate } from "date-fns";
import { frequencyOptions } from "./constants/RecurringConstans";

interface RecurringModalFormProps {
  form: IRecurring;
  categories: ICategory[];
  payMethods: IPayMethod[];
}
export const RecurringModalForm = ({
  form,
  categories,
  payMethods,
}: RecurringModalFormProps) => {
  return (
    <>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          지출 항목
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={form.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          placeholder="지출 항목을 입력하세요"
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          금액
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">₩</span>
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            value={form.amount}
            required
            min="0"
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            카테고리
          </label>
          <select
            id="category"
            name="category"
            value={form.categoryId}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-700"
          >
            결제수단
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={form.paymentMethodId}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          >
            {payMethods.map((method) => (
              <option key={method.id} value={method.name}>
                {method.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-gray-700"
          >
            반복 주기
          </label>
          <select
            id="frequency"
            name="frequency"
            value={form.cycle}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          >
            {frequencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="paymentDay"
            className="block text-sm font-medium text-gray-700"
          >
            결제일
          </label>
          <input
            type="number"
            name="paymentDay"
            id="paymentDay"
            value={getDate(form.nextPaymentDate)}
            min="1"
            max="31"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            시작일
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={format(form.billingStartDay, "yyyy-MM-dd")}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            종료일 (선택사항)
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={format(form.billingEndDay, "yyyy-MM-dd") || ""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="memo"
          className="block text-sm font-medium text-gray-700"
        >
          메모 (선택사항)
        </label>
        <textarea
          id="memo"
          name="memo"
          value="메모"
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
          placeholder="추가 정보를 입력하세요"
        />
      </div>

      <div className="flex items-center">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          checked={form.isActive}
          // onChange={(e) => setForm({ ...form, isActive: e.target.checked })}

          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          활성화
        </label>
      </div>
    </>
  );
};
