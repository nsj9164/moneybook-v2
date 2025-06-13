import { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function useModalFormArray<T extends FieldValues>(defaultItem: T) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm<{ items: T[] }>({
    defaultValues: { items: [defaultItem] },
  });

  const openModal = (items?: T) => {
    const valueToUse = items ?? defaultItem;
    const isEditingMode = valueToUse.id !== defaultItem.id;

    methods.reset({ items: [valueToUse] });
    setIsOpen(true);
    setIsEditing(isEditingMode);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    methods,
    isOpen,
    isEditing,
    openModal,
    closeModal,
  };
}
