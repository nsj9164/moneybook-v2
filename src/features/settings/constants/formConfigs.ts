import { categoryEmojiOptions } from "../manageCategories/constants/categoryEmojiOptions";
import { payMethodEmojiOptions } from "../managePayMethods/constants/PayMethodConstants";
import { BaseMap, FieldConfig, FormType } from "../types/GenericFormTypes";
import { categoryColorOptions } from "../manageCategories/constants/categoryColorOptions";
import { addMonths, format, startOfMonth } from "date-fns";

const today = new Date();
const startOfNextMonth = startOfMonth(addMonths(today, 1));

export const formMeta: {
  [K in FormType]: {
    title: string;
    initial: () => BaseMap[K];
  };
} = {
  [FormType.Categories]: {
    title: "카테고리",
    initial: () => ({
      name: "",
      color: categoryColorOptions[0].value,
      emoji: categoryEmojiOptions[0],
      defaultYn: false,
      transactionType: 2,
      userId: "",
    }),
  },

  [FormType.PayMethods]: {
    title: "결제수단",
    initial: () => ({
      name: "",
      emoji: payMethodEmojiOptions[0],
      defaultYn: false,
      typeId: 1,
      userId: "",
    }),
  },

  [FormType.Recurrings]: {
    title: "고정지출",
    initial: () => ({
      name: "",
      amount: 0,
      cycle: 4,
      billingStartDate: format(today, "yyyy-MM-dd"),
      billingEndDate: undefined,
      paymentDay: 1,
      nextPaymentDate: format(startOfNextMonth, "yyyy-MM-dd"),
      note: "",
      isActive: true,
      categoryId: 0,
      paymentMethodId: 0,
    }),
  },
};

export const formFieldConfigs: Partial<Record<FormType, FieldConfig[]>> = {
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
