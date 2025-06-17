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
  budget: number;
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

export type FieldConfig<K extends FieldValues = FieldValues> =
  | {
      type: "text";
      name: Path<K>;
      label: string;
    }
  | {
      type: "emoji";
      name: Path<K>;
      label: string;
      options: string[];
    }
  | {
      type: "color";
      name: Path<K>;
      label: string;
      options: { value: string; label?: string }[];
    };
