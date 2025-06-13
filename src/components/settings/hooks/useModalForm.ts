import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm<T>({
    defaultValues,
  });

  const openModal = (data?: Partial<T>) => {
    if (data) {
      methods.reset({ ...defaultValues, ...data });
      setIsEditing(true);
    } else {
      methods.reset(defaultValues);
      setIsEditing(false);
    }
    setIsOpen(true);
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
