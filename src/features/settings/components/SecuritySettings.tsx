import { Lock, User } from "lucide-react";

export const SecuritySettings = () => {
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
