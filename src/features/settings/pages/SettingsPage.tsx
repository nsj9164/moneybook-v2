import { useState } from "react";
import { Bell, CreditCard, Globe, Save, List, Repeat } from "lucide-react";
import { GeneralSettings } from "../components/GeneralSettings";
import { NotificationSettings } from "../components/NotificationSettings";
import ManageCategories from "./SettingCategoriesPage";
import ManagePayMethods from "./SettingPayMethodsPage";
import ManageRecurringExpenses from "./SettingRecurringPage";

// 설정 탭 정의
type SettingTab =
  | "general"
  | "notifications"
  | "categories"
  | "paymentMethods"
  | "recurringExpenses"
  | "security";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingTab>("general");

  const settingTabs = [
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
  ];

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">설정</h1>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <Save className="mr-2 -ml-1 h-4 w-4" />
          변경사항 저장
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 설정 탭 메뉴 */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-gray-50 rounded-lg p-4">
            <nav className="space-y-1">
              {settingTabs.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as SettingTab)}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === key
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="mr-3 h-5 w-5 flex-shrink-0">{icon}</span>
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 설정 컨텐츠 */}
        <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden">
          {settingTabs.find((tab) => tab.key === activeTab)?.content}
        </div>
      </div>
    </div>
  );
};

export default Settings;
