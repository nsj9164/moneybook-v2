import { ICategory } from "@/types/expense-types";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  categoryColorOptions,
  categoryEmojiOptions,
} from "./constants/CategoryConstants";
import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Partial<ICategory>) => void;
  category?: ICategory;
  isEditing: boolean;
}

export type CategoryFormData = {
  id: number;
  name: string;
  color: string;
  emoji: string;
  defaultYn: boolean;
};

export const CategoryModal = ({
  isOpen,
  onClose,
  onSave,
  category,
  isEditing,
}: CategoryModalProps) => {
  const { userId } = useAuth();

  // if (!userId) {
  //   alert("로그인이 필요합니다.");
  //   return;
  // }

  const tempId = new Date().getTime();
  const initialCategory = {
    id: category?.id || tempId,
    name: category?.name || "",
    color: category?.color || categoryColorOptions[0].value,
    emoji: category?.emoji || categoryEmojiOptions[0],
    defaultYn: category?.defaultYn || false,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { dirtyFields },
    reset,
    watch,
  } = useForm({ defaultValues: initialCategory });

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) reset(initialCategory);
  }, [isOpen]);

  const handleStyleOptionChange = (key: "emoji" | "color", value: string) => {
    setValue(key, value, { shouldDirty: true });
  };

  const onSubmit = (data: CategoryFormData) => {
    const modified = Object.fromEntries(
      Object.keys(dirtyFields).map((key) => [
        key,
        data[key as keyof CategoryFormData],
      ])
    ) as Partial<ICategory>;

    const merged: ICategory = {
      ...initialCategory,
      ...modified,
      targetAmount: 0,
      transactionType: 2,
      userId: userId!,
    };

    onSave(merged);
  };

  const fieldValues = watch();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  {isEditing ? "카테고리 수정" : "카테고리 추가"}
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">닫기</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </DialogTitle>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      카테고리명
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      id="name"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      placeholder="카테고리명을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      아이콘
                    </label>
                    <div className="mt-1 grid grid-cols-10 gap-2">
                      {categoryEmojiOptions.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() =>
                            handleStyleOptionChange("emoji", emoji)
                          }
                          className={`flex h-8 w-8 items-center justify-center rounded-md text-lg ${
                            fieldValues.emoji === emoji
                              ? "bg-emerald-100 ring-2 ring-emerald-500"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          <span role="img" aria-label={`아이콘 ${emoji}`}>
                            {emoji}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      색상
                    </label>
                    <div className="mt-1 grid grid-cols-5 gap-2">
                      {categoryColorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() =>
                            handleStyleOptionChange("color", color.value)
                          }
                          className={`flex h-8 w-full items-center justify-center rounded-md ${
                            fieldValues.color === color.value
                              ? "ring-2 ring-offset-2 ring-emerald-500"
                              : ""
                          }`}
                          style={{ backgroundColor: color.value }}
                        >
                          {fieldValues.color === color.value && (
                            <Check className="h-5 w-5 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      onClick={onClose}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
                    >
                      {isEditing ? "수정" : "추가"}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
