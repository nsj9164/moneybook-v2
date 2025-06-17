import { Globe, Moon, Wallet } from "lucide-react";

export const GeneralSettings = () => {
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

        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
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
        </div> */}
      </div>
    </div>
  );
};
