import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BudgetItem } from "../list/BudgetItem";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import { initialBudget } from "../constants/BudgetConstants";
import { BudgetEntity, UnBudgetDisplay } from "@/types";
import { diffFields, filterEmptyFields } from "@/utils/form";
import { useState, useEffect } from "react";

interface AddBudgetModalProps {
  isOpen: boolean;
  isEditing: boolean;
  onClose: () => void;
  onSave: (budgetItems: BudgetEntity[]) => void;
  unBudgets: UnBudgetDisplay[];
}

const AddBudgetModal = ({
  isOpen,
  isEditing,
  onClose,
  onSave,
  unBudgets,
}: AddBudgetModalProps) => {
  const { handleSubmit, control, reset, getValues } = useFormContext<{
    items: BudgetEntity[];
  }>();

  const { fields, append } = useFieldArray<{ items: BudgetEntity[] }>({
    name: "items",
    control,
  });

  const [currentData, setCurrentData] = useState<{
    items: BudgetEntity[];
  }>({
    items: [],
  });

  useEffect(() => {
    if (isEditing && isOpen)
      setCurrentData(getValues() as { items: BudgetEntity[] });
  }, [isEditing, isOpen]);

  const onSubmit: SubmitHandler<{
    items: BudgetEntity[];
  }> = async ({ items }) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (isEditing && typeof item.budgetId === "number") {
        const prev = currentData.items[i];
        const diffed = diffFields(prev, item);

        if (Object.keys(diffed).length === 0) {
          console.log(`변경 사항 없음 (index ${i})`);
          continue;
        }

        const saveData = {
          ...diffed,
          id: item.budgetId,
          budgetId: item.budgetId,
        };
        await onSave([saveData]);
      } else {
        const saveData = filterEmptyFields(item);
        await onSave([saveData]);
      }
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    예산 추가
                  </h3>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6">
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <BudgetItem
                        key={field.categoryId}
                        index={index}
                        unBudgets={unBudgets}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => append(initialBudget())}
                    className="mt-4 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    예산 항목 추가
                  </button>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
                  >
                    저장
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddBudgetModal;
