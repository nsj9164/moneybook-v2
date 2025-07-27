import { CategoryEntity, PayMethodEntity, RecurringEntity } from "@/types";
import { FieldValues, Path } from "react-hook-form";

export enum FormType {
  Categories = "categories",
  PayMethods = "payMethods",
  Recurring = "recurring",
}

export type FormMap = {
  [FormType.Categories]: CategoryEntity;
  [FormType.PayMethods]: PayMethodEntity;
  [FormType.Recurring]: RecurringEntity;
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
