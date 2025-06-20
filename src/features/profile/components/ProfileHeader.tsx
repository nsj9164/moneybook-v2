import { Edit2 } from "lucide-react";

export const ProfileHeader = () => {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">프로필</h1>
        <p className="mt-1 text-sm text-gray-500">
          개인 정보를 관리하고 계정 설정을 변경하세요.
        </p>
      </div>
      <button
        type="button"
        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <Edit2 className="mr-2 -ml-1 h-4 w-4" />
        편집
      </button>
    </div>
  );
};
