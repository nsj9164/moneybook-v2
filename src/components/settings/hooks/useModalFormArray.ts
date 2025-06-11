import { useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function useModalFormArray<T extends FieldValues>(defaultItem: T) {
  const methods = useForm<{ items: T[] }>({
    defaultValues: { items: [defaultItem] },
  });
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(
    (items: T[] = [defaultItem]) => {
      methods.reset({ items });
      setIsOpen(true);
    },
    [defaultItem, methods]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    methods,
    isOpen,
    openModal,
    closeModal,
  };
}
