import { Bell } from "lucide-react";

export const NotificationSettings = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">알림 설정</h2>
      <div className="space-y-4">
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
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
        </div> */}

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
