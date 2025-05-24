import { ReactElement } from "react";
import { Bell, CreditCard, Globe, Lock, List, Repeat } from "lucide-react";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import ManageCategories from "@/components/settings/ManageCategories";
import ManagePayMethods from "@/components/settings/ManagePayMethods";
import ManageRecurringExpenses from "@/components/settings/ManageRecurringExpenses";
import { SecuritySettings } from "@/components/settings/SecuritySettings";

type SettingTabKey =
  | "general"
  | "notifications"
  | "categories"
  | "paymentMethods"
  | "recurringExpenses"
  | "security";

interface settingTabItemsProps {
  key: SettingTabKey;
  label: string;
  icon: ReactElement;
  content: ReactElement;
}

const settingTabItems: settingTabItemsProps[] = [
  {
    key: "general",
    label: "일반 설정",
    icon: <Globe />,
    content: <GeneralSettings />,
  },
  {
    key: "notifications",
    label: "알림 설정",
    icon: <Bell />,
    content: <NotificationSettings />,
  },
  {
    key: "categories",
    label: "카테고리 관리",
    icon: <List />,
    content: <ManageCategories />,
  },
  {
    key: "paymentMethods",
    label: "결제수단 관리",
    icon: <CreditCard />,
    content: <ManagePayMethods />,
  },
  {
    key: "recurringExpenses",
    label: "고정지출 관리",
    icon: <Repeat />,
    content: <ManageRecurringExpenses />,
  },
  {
    key: "security",
    label: "보안 설정",
    icon: <Lock />,
    content: <SecuritySettings />,
  },
];
