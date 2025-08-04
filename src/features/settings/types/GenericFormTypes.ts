import { CategoryDraft, PayMethodEntity } from "@/types";
import { FieldValues, Path } from "react-hook-form";

export enum FormType {
  Categories = "categories",
  PayMethods = "payMethods",
}

export type FormMap = {
  [FormType.Categories]: CategoryDraft;
  [FormType.PayMethods]: PayMethodEntity;
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
