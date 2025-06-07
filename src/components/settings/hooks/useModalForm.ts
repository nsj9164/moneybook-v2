import { useState } from "react";
import {
  DefaultValues,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";

export function useModalForm<T extends FieldValues>(
  initialValues: () => DefaultValues<T>
): {
  methods: UseFormReturn<T>;
  isOpen: boolean;
  isEditing: boolean;
  openModal: (data?: Partial<T>) => void;
  closeModal: () => void;
} {
  const methods = useForm<T>({
    defaultValues: initialValues(),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = (data?: Partial<T>) => {
    if (data) {
      methods.reset(data as T);
      setIsEditing(true);
    } else {
      methods.reset(initialValues());
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
