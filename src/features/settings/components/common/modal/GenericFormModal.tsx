import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { X } from "lucide-react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormMap, FormType } from "../../../types/GenericFormTypes";
import { diffFields, filterEmptyFields } from "@/utils/form";

interface GenericFormModalProps<K extends FormType> {
  formTitle: string;
  isOpen: boolean;
  isEditing: boolean;
  onSave: (data: Partial<FormMap[K]>) => void;
  onClose: () => void;
  children: React.ReactNode;
}

export function GenericFormModal<K extends FormType>({
  formTitle,
  isOpen,
  isEditing,
  onSave,
  onClose,
  children,
}: GenericFormModalProps<K>) {
  const methods = useFormContext<FormMap[K]>();
  const [currentData, setCurrentData] = useState<Partial<FormMap[K]>>({});
  useEffect(() => {
    if (isEditing && isOpen) setCurrentData(methods.getValues());
  }, [isEditing, isOpen]);

  const handleSubmitData: SubmitHandler<FormMap[K]> = async (data) => {
    if (isEditing) {
      const diffed = diffFields(currentData, data);
      if (Object.keys(diffed).length === 0) {
        console.log("변경 사항 없음");
        return;
      }

      const saveData = { ...diffed, id: currentData.id };
      await onSave(saveData);
    } else {
      const saveData = filterEmptyFields(data);
      await onSave(saveData);
    }

    onClose();
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

                <form
                  onSubmit={methods.handleSubmit(handleSubmitData)}
                  className="mt-4 space-y-4"
                >
                  {children}

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
