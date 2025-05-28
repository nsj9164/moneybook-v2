import {
  categoryColorOptions,
  categoryEmojiOptions,
} from "../manageCategoroies/constants/CategoryConstants";
import { payMethodEmojiOptions } from "../managePayMethods/constants/PayMethodConstants";
import { FormMap, FormType } from "./types";

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
    }),
  },

  [FormType.PayMethods]: {
    title: "결제수단",
    initial: () => ({
      id: Date.now(),
      name: "",
      emoji: payMethodEmojiOptions[0],
      defaultYn: false,
    }),
  },
};
