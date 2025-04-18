import { useState } from "react";
import { Bell, CreditCard, Globe, Lock, Moon, Save, User } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("ko");
  const [currency, setCurrency] = useState("KRW");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    monthlyReport: true,
    budgetAlert: true,
    weeklyTips: false,
  });
  const [defaultCategory, setDefaultCategory] = useState("식비");
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("신용카드");

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
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

      <div className="space-y-6">
        {/* 일반 설정 */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">일반 설정</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <Moon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    다크 모드
                  </h3>
                  <p className="text-sm text-gray-500">
                    어두운 테마로 전환합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`${
                    darkMode ? "bg-emerald-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
                >
                  <span className="sr-only">다크 모드 사용</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      darkMode ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
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
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="zh">中文</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">통화</h3>
                  <p className="text-sm text-gray-500">
                    기본 통화를 선택합니다.
                  </p>
                </div>
              </div>
              <select
                id="currency"
                name="currency"
                className="mt-1 block w-full sm:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="KRW">원화 (₩)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="JPY">Japanese Yen (¥)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 알림 설정 */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">알림 설정</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <Bell className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    이메일 알림
                  </h3>
                  <p className="text-sm text-gray-500">
                    이메일로 알림을 받습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleNotificationChange("email")}
                  className={`${
                    notifications.email ? "bg-emerald-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
                >
                  <span className="sr-only">이메일 알림 사용</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      notifications.email ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  ></span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <Bell className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    푸시 알림
                  </h3>
                  <p className="text-sm text-gray-500">
                    앱 푸시 알림을 받습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleNotificationChange("push")}
                  className={`${
                    notifications.push ? "bg-emerald-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
                >
                  <span className="sr-only">푸시 알림 사용</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      notifications.push ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  ></span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <Bell className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    월간 리포트
                  </h3>
                  <p className="text-sm text-gray-500">
                    월별 지출 리포트를 받습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleNotificationChange("monthlyReport")}
                  className={`${
                    notifications.monthlyReport
                      ? "bg-emerald-600"
                      : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
                >
                  <span className="sr-only">월간 리포트 사용</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      notifications.monthlyReport
                        ? "translate-x-5"
                        : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  ></span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <Bell className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    예산 알림
                  </h3>
                  <p className="text-sm text-gray-500">
                    예산 초과 시 알림을 받습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleNotificationChange("budgetAlert")}
                  className={`${
                    notifications.budgetAlert ? "bg-emerald-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
                >
                  <span className="sr-only">예산 알림 사용</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      notifications.budgetAlert
                        ? "translate-x-5"
                        : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  ></span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <Bell className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">주간 팁</h3>
                  <p className="text-sm text-gray-500">
                    절약 팁을 주간으로 받습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleNotificationChange("weeklyTips")}
                  className={`${
                    notifications.weeklyTips ? "bg-emerald-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
                >
                  <span className="sr-only">주간 팁 사용</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      notifications.weeklyTips
                        ? "translate-x-5"
                        : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 기본 설정 */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">기본 설정</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    기본 카테고리
                  </h3>
                  <p className="text-sm text-gray-500">
                    새 지출 추가 시 기본 카테고리를 설정합니다.
                  </p>
                </div>
              </div>
              <select
                id="default-category"
                name="default-category"
                className="mt-1 block w-full sm:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                value={defaultCategory}
                onChange={(e) => setDefaultCategory(e.target.value)}
              >
                <option value="식비">식비</option>
                <option value="교통비">교통비</option>
                <option value="주거비">주거비</option>
                <option value="통신비">통신비</option>
                <option value="의료/건강">의료/건강</option>
                <option value="교육">교육</option>
                <option value="쇼핑">쇼핑</option>
                <option value="여가">여가</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    기본 결제 수단
                  </h3>
                  <p className="text-sm text-gray-500">
                    새 지출 추가 시 기본 결제 수단을 설정합니다.
                  </p>
                </div>
              </div>
              <select
                id="default-payment-method"
                name="default-payment-method"
                className="mt-1 block w-full sm:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                value={defaultPaymentMethod}
                onChange={(e) => setDefaultPaymentMethod(e.target.value)}
              >
                <option value="신용카드">신용카드</option>
                <option value="체크카드">체크카드</option>
                <option value="현금">현금</option>
                <option value="계좌이체">계좌이체</option>
                <option value="자동이체">자동이체</option>
                <option value="기타">기타</option>
              </select>
            </div>
          </div>
        </div>

        {/* 보안 설정 */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">보안 설정</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
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
                  <h3 className="text-sm font-medium text-gray-900">
                    계정 삭제
                  </h3>
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
      </div>
    </div>
  );
};

export default Settings;
