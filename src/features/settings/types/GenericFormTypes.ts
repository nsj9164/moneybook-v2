import {
  CategoryBase,
  CategorySaved,
  PayMethodBase,
  PayMethodSaved,
  RecurringBase,
  RecurringSaved,
} from "@/types";
import { FieldValues, Path } from "react-hook-form";

export enum FormType {
  Categories = "categories",
  PayMethods = "payMethods",
  Recurrings = "recurrings",
}

export type BaseMap = {
  [FormType.Categories]: CategoryBase;
  [FormType.PayMethods]: PayMethodBase;
  [FormType.Recurrings]: RecurringBase;
};

export type SavedMap = {
  [FormType.Categories]: CategorySaved;
  [FormType.PayMethods]: PayMethodSaved;
  [FormType.Recurrings]: RecurringSaved;
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
