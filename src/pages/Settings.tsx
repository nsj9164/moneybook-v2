"use client";

import { useState } from "react";
import {
  Bell,
  CreditCard,
  Globe,
  Lock,
  Moon,
  Save,
  User,
  List,
  Repeat,
  Wallet,
} from "lucide-react";
import ManageCategories from "./Settings/ManageCategories";
import ManagePaymentMethods from "./Settings/ManagePayMethods";
import ManageRecurringExpenses from "./Settings/ManageRecurringExpenses";

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

  // 탭 컨텐츠 렌더링
  const renderTabContent = () => {
    switch (activeTab) {
      case "categories":
        return <ManageCategories />;
      case "paymentMethods":
        return <ManagePaymentMethods />;
      case "recurringExpenses":
        return <ManageRecurringExpenses />;
      case "general":
        return <GeneralSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return <GeneralSettings />;
    }
  };

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
              <button
                onClick={() => setActiveTab("general")}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "general"
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Globe className="mr-3 h-5 w-5 flex-shrink-0" />
                일반 설정
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "notifications"
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Bell className="mr-3 h-5 w-5 flex-shrink-0" />
                알림 설정
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "categories"
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <List className="mr-3 h-5 w-5 flex-shrink-0" />
                카테고리 관리
              </button>
              <button
                onClick={() => setActiveTab("paymentMethods")}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "paymentMethods"
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <CreditCard className="mr-3 h-5 w-5 flex-shrink-0" />
                결제수단 관리
              </button>
              <button
                onClick={() => setActiveTab("recurringExpenses")}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "recurringExpenses"
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Repeat className="mr-3 h-5 w-5 flex-shrink-0" />
                고정지출 관리
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "security"
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Lock className="mr-3 h-5 w-5 flex-shrink-0" />
                보안 설정
              </button>
            </nav>
          </div>
        </div>

        {/* 설정 컨텐츠 */}
        <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// 일반 설정 컴포넌트 (기존 코드 재사용)
const GeneralSettings = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">일반 설정</h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <Moon className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">다크 모드</h3>
              <p className="text-sm text-gray-500">어두운 테마로 전환합니다.</p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span className="sr-only">다크 모드 사용</span>
              <span
                aria-hidden="true"
                className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              ></span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <Globe className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">언어</h3>
              <p className="text-sm text-gray-500">앱 언어를 선택합니다.</p>
            </div>
          </div>
          <select
            id="language"
            name="language"
            className="mt-1 block w-full sm:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            defaultValue="ko"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="zh">中文</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <Wallet className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">통화</h3>
              <p className="text-sm text-gray-500">기본 통화를 선택합니다.</p>
            </div>
          </div>
          <select
            id="currency"
            name="currency"
            className="mt-1 block w-full sm:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
            defaultValue="KRW"
          >
            <option value="KRW">원화 (₩)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="JPY">Japanese Yen (¥)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// 알림 설정 컴포넌트 (기존 코드 재사용)
const NotificationSettings = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">알림 설정</h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <Bell className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">이메일 알림</h3>
              <p className="text-sm text-gray-500">이메일로 알림을 받습니다.</p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="bg-emerald-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span className="sr-only">이메일 알림 사용</span>
              <span
                aria-hidden="true"
                className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              ></span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <Bell className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">푸시 알림</h3>
              <p className="text-sm text-gray-500">앱 푸시 알림을 받습니다.</p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="bg-emerald-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span className="sr-only">푸시 알림 사용</span>
              <span
                aria-hidden="true"
                className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              ></span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <Bell className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">예산 알림</h3>
              <p className="text-sm text-gray-500">
                예산 초과 시 알림을 받습니다.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="bg-emerald-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span className="sr-only">예산 알림 사용</span>
              <span
                aria-hidden="true"
                className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 보안 설정 컴포넌트 (기존 코드 재사용)
const SecuritySettings = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">보안 설정</h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <Lock className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                비밀번호 변경
              </h3>
              <p className="text-sm text-gray-500">
                계정 비밀번호를 변경합니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            비밀번호 변경
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-2 sm:mb-0">
            <User className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">계정 삭제</h3>
              <p className="text-sm text-gray-500">
                계정과 모든 데이터를 영구적으로 삭제합니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            계정 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
