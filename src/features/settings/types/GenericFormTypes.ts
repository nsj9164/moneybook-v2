import {
  CategoryBase,
  CategorySaved,
  PayMethodBase,
  PayMethodSaved,
} from "@/types";
import { FieldValues, Path } from "react-hook-form";

export enum FormType {
  Categories = "categories",
  PayMethods = "payMethods",
}

export type BaseMap = {
  [FormType.Categories]: CategoryBase;
  [FormType.PayMethods]: PayMethodBase;
};

export type SavedMap = {
  [FormType.Categories]: CategorySaved;
  [FormType.PayMethods]: PayMethodSaved;
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
