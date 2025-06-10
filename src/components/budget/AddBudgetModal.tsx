import { useState } from "react";
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BudgetItem } from "./BudgetItem";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { CategoryStatDisplay, CategoryStatInput } from "@/types";
import { initialBudget } from "./constants/BudgetConstants";

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budgetItems: CategoryStatInput[]) => void;
  budgetNList: CategoryStatDisplay[];
}

const AddBudgetModal = ({
  isOpen,
  onClose,
  onSave,
  budgetNList,
}: AddBudgetModalProps) => {
  const [budgetItems, setBudgetItems] = useState<CategoryStatInput[]>([
    initialBudget,
  ]);

  const methods = useForm<{ items: CategoryStatInput[] }>({
    defaultValues: { items: budgetItems },
  });
  const { handleSubmit } = methods;

  const addBudgetItem = () => {
    setBudgetItems((prev) => [...prev, initialBudget]);
  };

  const removeBudgetItem = (id: number) => {
    setBudgetItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onSubmit: SubmitHandler<{ items: CategoryStatInput[] }> = () => {
    const validItems = budgetItems.filter((item) => item.id && item.budget > 0);
    if (validItems.length > 0) {
      onSave(validItems);
      setBudgetItems([initialBudget]);
      onClose();
    }
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

              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="p-6">
                    <div className="space-y-4">
                      {budgetItems.map((item, index) => (
                        <BudgetItem key={item.id} budgetNList={budgetNList} />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={addBudgetItem}
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
              </FormProvider>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddBudgetModal;
