"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BudgetItem {
  id: string;
  categoryId: string;
  amount: number;
  period: "monthly" | "weekly" | "yearly";
}

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budgetItems: BudgetItem[]) => void;
  existingBudgets: BudgetItem[];
}

const categories = [
  { id: "1", name: "식비", color: "bg-rose-500" },
  { id: "2", name: "교통비", color: "bg-blue-500" },
  { id: "3", name: "주거비", color: "bg-amber-500" },
  { id: "4", name: "통신비", color: "bg-emerald-500" },
  { id: "5", name: "의료/건강", color: "bg-purple-500" },
  { id: "6", name: "교육", color: "bg-indigo-500" },
  { id: "7", name: "쇼핑", color: "bg-pink-500" },
  { id: "8", name: "여가", color: "bg-teal-500" },
  { id: "9", name: "기타", color: "bg-gray-500" },
];

const AddBudgetModal = ({
  isOpen,
  onClose,
  onSave,
  existingBudgets,
}: AddBudgetModalProps) => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    {
      id: Date.now().toString(),
      categoryId: "",
      amount: 0,
      period: "monthly",
    },
  ]);

  const addBudgetItem = () => {
    setBudgetItems([
      ...budgetItems,
      {
        id: Date.now().toString(),
        categoryId: "",
        amount: 0,
        period: "monthly",
      },
    ]);
  };

  const removeBudgetItem = (id: string) => {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
  };

  const updateBudgetItem = (
    id: string,
    field: keyof BudgetItem,
    value: any
  ) => {
    setBudgetItems(
      budgetItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = () => {
    const validItems = budgetItems.filter(
      (item) => item.categoryId && item.amount > 0
    );
    if (validItems.length > 0) {
      onSave(validItems);
      setBudgetItems([
        {
          id: Date.now().toString(),
          categoryId: "",
          amount: 0,
          period: "monthly",
        },
      ]);
      onClose();
    }
  };

  const getAvailableCategories = (currentItemId: string) => {
    const usedCategoryIds = budgetItems
      .filter((item) => item.id !== currentItemId && item.categoryId)
      .map((item) => item.categoryId);

    const existingCategoryIds = existingBudgets.map(
      (budget) => budget.categoryId
    );

    return categories.filter(
      (category) =>
        !usedCategoryIds.includes(category.id) &&
        !existingCategoryIds.includes(category.id)
    );
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

              <div className="p-6">
                <div className="space-y-4">
                  {budgetItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          카테고리
                        </label>
                        <select
                          value={item.categoryId}
                          onChange={(e) =>
                            updateBudgetItem(
                              item.id,
                              "categoryId",
                              e.target.value
                            )
                          }
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                        >
                          <option value="">선택하세요</option>
                          {getAvailableCategories(item.id).map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          예산 금액
                        </label>
                        <input
                          type="number"
                          value={item.amount || ""}
                          onChange={(e) =>
                            updateBudgetItem(
                              item.id,
                              "amount",
                              Number.parseInt(e.target.value) || 0
                            )
                          }
                          placeholder="0"
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          기간
                        </label>
                        <select
                          value={item.period}
                          onChange={(e) =>
                            updateBudgetItem(
                              item.id,
                              "period",
                              e.target.value as "monthly" | "weekly" | "yearly"
                            )
                          }
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                        >
                          <option value="weekly">주간</option>
                          <option value="monthly">월간</option>
                          <option value="yearly">연간</option>
                        </select>
                      </div>

                      <div className="flex items-end">
                        {budgetItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBudgetItem(item.id)}
                            className="inline-flex items-center justify-center w-full rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
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
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
                >
                  저장
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddBudgetModal;
