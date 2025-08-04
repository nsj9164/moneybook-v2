import { FieldConfig } from "@/features/settings/types/GenericFormTypes";

export const categoryEmojiOptions = [
  "🍔",
  "🚗",
  "🎬",
  "🛒",
  "💄",
  "🏠",
  "💊",
  "📚",
  "🗂️",
  "☕",
  "🍽️",
  "🛍️",
  "🏋️",
  "✈️",
  "🐶",
  "🍼",
  "💰",
  "🛡️",
  "🎁",
  "📈",
];

export const categoryColorOptions = [
  { name: "빨강", value: "#ef4444" },
  { name: "주황", value: "#f97316" },
  { name: "노랑", value: "#f59e0b" },
  { name: "초록", value: "#10b981" },
  { name: "청록", value: "#14b8a6" },
  { name: "파랑", value: "#3b82f6" },
  { name: "남색", value: "#6366f1" },
  { name: "보라", value: "#8b5cf6" },
  { name: "분홍", value: "#ec4899" },
  { name: "회색", value: "#6b7280" },
];

export const categoryFormFieldConfigs: FieldConfig[] = [
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
];
