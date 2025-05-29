import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { FieldOption } from "../types/GenericFromTypes";
import { formFieldOptions } from "../constants/formConfigs";

interface GenericFormModalProps<T> {
  formTitle: string;
  formData: T;
  fieldOptions: FieldOption[];
  isOpen: boolean;
  isEditing: boolean;
  onClose: () => void;
  onSave: (form: T) => void;
}

export function GenericFormModal<T>({
  formTitle,
  formData,
  fieldOptions,
  isOpen,
  isEditing,
  onClose,
  onSave,
}: GenericFormModalProps<T>) {
  const [form, setForm] = useState<T>(formData);

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) setForm(formData);
  }, [isOpen]);

  const handleChange = (key: string, option: string) => {
    console.log("handleChange:::", key, option, form);
    setForm({ ...form, [key]: option });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

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
                  {isEditing ? `${formTitle} 수정` : `${formTitle} 추가`}
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">닫기</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </DialogTitle>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {fieldOptions.map((field) => {
                    const fieldKey = field.name as keyof typeof formData;
                    const fieldValue = form[fieldKey];

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
                            type="text"
                            value={
                              typeof fieldValue === "string" ? fieldValue : ""
                            }
                            onChange={(e) =>
                              handleChange(field.name, e.target.value)
                            }
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                            placeholder={`${formTitle}명을 입력하세요`}
                          />
                        </div>
                      );
                    }

                    if (field.type === "emoji") {
                      const emojiOptions = (field.options ?? []) as string[];
                      return (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                          </label>
                          <div className="mt-1 grid grid-cols-10 gap-2">
                            {emojiOptions.map((emoji) => {
                              const isSelected = fieldValue === emoji;
                              return (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() =>
                                    handleChange(field.name, emoji)
                                  }
                                  className={`flex h-8 w-8 items-center justify-center rounded-md text-lg ${
                                    isSelected
                                      ? "bg-emerald-100 ring-2 ring-emerald-500"
                                      : "bg-gray-100 hover:bg-gray-200"
                                  }`}
                                >
                                  <span
                                    role="img"
                                    aria-label={`아이콘 ${emoji}`}
                                  >
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
                      const colorOptions = (field.options ?? []) as {
                        name: string;
                        value: string;
                      }[];
                      return (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                          </label>
                          <div className="mt-1 grid grid-cols-5 gap-2">
                            {colorOptions.map((color) => {
                              const isSelected = fieldValue === color.value;
                              return (
                                <button
                                  key={color.value}
                                  type="button"
                                  onClick={() =>
                                    handleChange(field.name, color.value)
                                  }
                                  className={`flex h-8 w-full items-center justify-center rounded-md ${
                                    isSelected
                                      ? "ring-2 ring-offset-2 ring-emerald-500"
                                      : ""
                                  }`}
                                  style={{ backgroundColor: color.value }}
                                >
                                  {isSelected && (
                                    <Check className="h-5 w-5 text-white" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                  })}

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
}
