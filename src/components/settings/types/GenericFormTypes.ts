import { ICategory, UUID } from "@/types/expense-types";
import { FieldValues, Path } from "react-hook-form";

export enum FormType {
  Categories = "categories",
  PayMethods = "payMethods",
}

export interface CategoryForm {
  id: number;
  name: string;
  color: string;
  emoji: string;
  defaultYn: boolean;
  targetAmount: number;
  transactionType: number;
  userId: string;
}

export interface PayMethodForm {
  id: number;
  name: string;
  emoji: string;
  defaultYn: boolean;
  typeId: number;
}

export type FormMap = {
  [FormType.Categories]: CategoryForm;
  [FormType.PayMethods]: PayMethodForm;
};

export type FieldConfig<T> =
  | {
      type: "text";
      name: keyof T & string;
      label: string;
    }
  | {
      type: "emoji";
      name: keyof T & string;
      label: string;
      options: string[];
    }
  | {
      type: "color";
      name: keyof T & string;
      label: string;
      options: { value: string; label?: string }[];
    };
