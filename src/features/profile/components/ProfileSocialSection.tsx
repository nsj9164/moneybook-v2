import { AlertCircle } from "lucide-react";

export const ProfileSocialSection = () => {
  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        연결된 소셜 계정
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
              <span className="text-sm font-medium text-white">K</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">카카오</p>
              <p className="text-xs text-gray-500">user@kakao.com</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                <span className="text-xs text-green-600 font-medium">
                  연결됨
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-yellow-300 bg-white px-4 py-2 text-xs font-medium text-yellow-700 shadow-sm hover:bg-yellow-50"
          >
            연결 해제
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300">
              <span className="text-sm font-medium text-blue-600">G</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">구글</p>
              <p className="text-xs text-gray-500">user@gmail.com</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                <span className="text-xs text-green-600 font-medium">
                  연결됨
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-blue-300 bg-white px-4 py-2 text-xs font-medium text-blue-700 shadow-sm hover:bg-blue-50"
          >
            연결 해제
          </button>
        </div>
      </div>

      {/* 소셜 로그인 안내 */}
      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-gray-600" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-gray-800">
              소셜 계정 연결 안내
            </h4>
            <p className="mt-1 text-xs text-gray-600">
              최소 하나의 소셜 계정은 연결되어 있어야 합니다. 모든 계정을 연결
              해제하면 로그인할 수 없게 됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
