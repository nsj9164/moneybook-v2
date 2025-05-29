import { ICategory, UUID } from "@/types/expense-types";

export interface BaseForm {
  id: number;
  name: string;
  emoji: string;
  defaultYn: boolean;
}

export interface PayMethodForm extends BaseForm {
  typeId: number;
}

export interface CategoryForm extends BaseForm {
  color: string;
  targetAmount: number;
  transactionType: number;
  userId: UUID;
}

export enum FormType {
  Categories = "categories",
  PayMethods = "payMethods",
}

export type FormMap = {
  [FormType.Categories]: CategoryForm;
  [FormType.PayMethods]: PayMethodForm;
};

export interface FieldOption {
  type: "text" | "emoji" | "color";
  name: string;
  label: string;
  options?: string[] | { value: string; label?: string }[];
}
