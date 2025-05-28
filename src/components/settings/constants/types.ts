export interface BaseForm {
  id: number;
  name: string;
  emoji: string;
  defaultYn: boolean;
}

export interface CategoryForm extends BaseForm {
  color: string;
}

export type PayMethodForm = BaseForm;

export enum FormType {
  Categories = "categories",
  PayMethods = "payMethods",
}

export type FormMap = {
  [FormType.Categories]: CategoryForm;
  [FormType.PayMethods]: PayMethodForm;
};
