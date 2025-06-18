import { createTempEntityId } from "@/types/ids";
import {
  categoryColorOptions,
  categoryEmojiOptions,
} from "../features/manageCategories/constants/CategoryConstants";
import { payMethodEmojiOptions } from "../features/managePayMethods/constants/PayMethodConstants";
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
      id: createTempEntityId(),
      name: "",
      color: categoryColorOptions[0].value,
      emoji: categoryEmojiOptions[0],
      defaultYn: false,
      budget: 0,
      transactionType: 2,
      userId: "",
    }),
  },

  [FormType.PayMethods]: {
    title: "결제수단",
    initial: () => ({
      id: createTempEntityId(),
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
