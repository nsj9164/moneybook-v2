import { useFormContext } from "react-hook-form";
import { CategoryDraft } from "@/types";
import { cn } from "@/lib/utils"; // optional: tailwind merge

export function CategoryModalFields() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CategoryDraft>();

  const selectedEmoji = watch("emoji");
  const selectedColor = watch("color");

  const emojiOptions = ["💰", "🍔", "🎁", "🚗", "📚"];
  const colorOptions = ["#16a34a", "#2563eb", "#f97316", "#dc2626", "#7c3aed"];

  return (
    <div className="space-y-6">
      {/* 이름 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">이름</label>
        <input
          {...register("name", { required: "이름은 필수 입력 항목입니다." })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* 예산 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">예산</label>
        <input
          type="number"
          {...register("budget", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>

      {/* 거래 유형 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          거래 유형
        </label>
        <select
          {...register("transactionType", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        >
          <option value={0}>지출</option>
          <option value={1}>수입</option>
        </select>
      </div>

      {/* 이모지 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이모지
        </label>
        <div className="flex gap-2">
          {emojiOptions.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setValue("emoji", emoji)}
              className={cn(
                "text-2xl p-2 border rounded-md",
                selectedEmoji === emoji
                  ? "border-emerald-500 ring-2 ring-emerald-400"
                  : "border-gray-300"
              )}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* 색상 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          색상
        </label>
        <div className="flex gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setValue("color", color)}
              className={cn(
                "w-6 h-6 rounded-full border-2",
                selectedColor === color
                  ? "ring-2 ring-emerald-400 border-white"
                  : "border-gray-300"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* 기본 여부 */}
      <div className="flex items-center gap-2">
        <input
          id="defaultYn"
          type="checkbox"
          {...register("defaultYn")}
          className="rounded border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-500"
        />
        <label htmlFor="defaultYn" className="text-sm text-gray-700">
          기본 카테고리로 설정
        </label>
      </div>
    </div>
  );
}
