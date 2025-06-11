import { useCallback, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";

interface UseModalFormResult<T extends FieldValues> {
  methods: UseFormReturn<T>;
  isOpen: boolean;
  isEditing: boolean;
  openModal: (data?: Partial<T>) => void;
  closeModal: () => void;
}

export function useModalForm<T extends FieldValues>(
  defaultValues: DefaultValues<T>
): UseModalFormResult<T> {
  const methods = useForm<T>({
    defaultValues,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = useCallback(
    (data?: Partial<T>) => {
      methods.reset(data ? { ...defaultValues, ...data } : defaultValues);
      setIsEditing(!!data);
      setIsOpen(true);
    },
    [defaultValues, methods]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    methods,
    isOpen,
    isEditing,
    openModal,
    closeModal,
  };
}
