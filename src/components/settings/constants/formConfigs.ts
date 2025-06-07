import {
  categoryColorOptions,
  categoryEmojiOptions,
} from "../manageCategories/constants/CategoryConstants";
import { payMethodEmojiOptions } from "../managePayMethods/constants/PayMethodConstants";
import { FieldConfig, FormMap, FormType } from "../types/GenericFormTypes";

export const formMeta: {
  [K in FormType]: {
    title: string;
    initial: () => FormMap[K];
  };
} = {
  [FormType.Categories]: {
    title: "카테고리",
    initial: () => ({
      id: Date.now(),
      name: "",
      color: categoryColorOptions[0].value,
      emoji: categoryEmojiOptions[0],
      defaultYn: false,
      targetAmount: 0,
      transactionType: 2,
      userId: "",
    }),
  },

  [FormType.PayMethods]: {
    title: "결제수단",
    initial: () => ({
      id: Date.now(),
      name: "",
      emoji: payMethodEmojiOptions[0],
      defaultYn: false,
      typeId: 1,
    }),
  },
};

export const formFieldConfigs: {
  [K in FormType]: FieldConfig[];
} = {
  [FormType.Categories]: [
    { name: "name", type: "text", label: "카테고리명" },
    {
      name: "emoji",
      type: "emoji",
      label: "아이콘",
      options: categoryEmojiOptions,
    },
    {
      name: "color",
      type: "color",
      label: "색상",
      options: categoryColorOptions,
    },
  ],
  [FormType.PayMethods]: [
    { name: "name", type: "text", label: "결제수단명" },
    {
      name: "emoji",
      type: "emoji",
      label: "아이콘",
      options: payMethodEmojiOptions,
    },
  ],
};
