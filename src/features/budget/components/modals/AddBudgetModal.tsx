import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFieldArray, useFormContext } from "react-hook-form";
import { initialBudget } from "../../constants/BudgetConstants";
import { useRef, useLayoutEffect } from "react";
import { BudgetItem } from "./BudgetItem";
import { toast } from "react-hot-toast";
import { BudgetInsertDTO, BudgetUpdateDTO } from "../../types/budget.dto";
import { BudgetDisplay } from "../../types/budget.display";
import { BudgetRecord, isSaved } from "../../types/budget.guards";
import {
  BudgetDraft,
  BudgetEntity,
  BudgetSaved,
} from "../../types/budget.entity";

interface AddBudgetModalProps {
  isOpen: boolean;
  isEditing: boolean;
  onClose: () => void;
  onSave: (
    budgetItems: (BudgetInsertDTO | BudgetUpdateDTO)[]
  ) => void | Promise<void>;
  unBudgets: BudgetDisplay[];
}

type FormShape = { items: BudgetRecord[] };

const AddBudgetModal = ({
  isOpen,
  isEditing,
  onClose,
  onSave,
  unBudgets,
}: AddBudgetModalProps) => {
  const { handleSubmit, control, getValues } = useFormContext<FormShape>();

  const { fields, append } = useFieldArray<FormShape>({
    name: "items",
    control,
  });

  const prevDataRef = useRef<FormShape>({ items: [] });

  useLayoutEffect(() => {
    if (isOpen) {
      const snapshot = getValues();
      prevDataRef.current = {
        items: snapshot.items.map((item) => ({ ...item })),
      };
    }
  }, [isOpen, isEditing]);

  const onSubmit = async ({ items }: FormShape) => {
    const prevItems = prevDataRef.current.items;

    const prevById = new Map<number, BudgetSaved>(
      prevItems.filter(isSaved).map((p) => [p.id, p])
    );

    const toSave: (BudgetDraft | BudgetUpdateDTO)[] = [];

    for (const item of items) {
      if (isSaved(item)) {
        const prev = prevById.get(item.id);
        if (!prev) {
          toSave.push(item);
          continue;
        }

        const patch: Partial<Pick<BudgetEntity, "categoryId" | "amount">> = {};
        if (item.categoryId !== prev.categoryId)
          patch.categoryId = item.categoryId;
        if (item.amount !== prev.amount) patch.amount = item.amount;

        if (Object.keys(patch).length === 0) {
          toast.error("저장할 변경 사항이 없습니다.");
          continue;
        }

        toSave.push({ id: item.id, ...patch });
      } else {
        toSave.push(item);
      }
    }

    if (toSave.length === 0) {
      onClose();
      return;
    }

    await onSave(toSave);
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
                        key={field.id}
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
