import { ExpenseColumns } from "@/pages/Expenses/types/filters";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

interface ColumnSettingsModalProps {
  isColumnModalOpen: boolean;
  closeColumnModal: () => void;
  columns: ExpenseColumns[];
  toggleColumnVisibility: (columnId: string) => void;
}

export const ColumnSettingsModal = ({
  isColumnModalOpen,
  closeColumnModal,
  columns,
  toggleColumnVisibility,
}: ColumnSettingsModalProps) => {
  return (
    <Transition appear show={isColumnModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeColumnModal}>
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
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  표시 항목 설정
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    테이블에 표시할 항목을 선택하세요.
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {columns.map((column) => (
                    <div key={column.id} className="flex items-center">
                      <input
                        id={`column-${column.id}`}
                        name={`column-${column.id}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        checked={column.visible}
                        onChange={() => toggleColumnVisibility(column.id)}
                      />
                      <label
                        htmlFor={`column-${column.id}`}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {column.name}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    onClick={closeColumnModal}
                  >
                    확인
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
