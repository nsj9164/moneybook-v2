import { ProviderType } from "@/features/auth/types/auth";

interface SocialAccountCardProps {
  provider: ProviderType;
  email: string;
  toggleModal: (type: boolean) => void;
}

export const SocialAccountCard = ({
  provider,
  email,
  toggleModal,
}: SocialAccountCardProps) => {
  const isKakao = provider === "kakao";

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border ${
        isKakao
          ? "bg-yellow-50 border-yellow-200"
          : "bg-blue-50 border-blue-200"
      }`}
    >
      <div className="flex items-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isKakao ? "bg-yellow-400" : "bg-white border border-gray-300"
          }`}
        >
          <span
            className={`text-sm font-medium ${
              isKakao ? "text-white" : "text-blue-600"
            }`}
          >
            {isKakao ? "K" : "G"}
          </span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-900">
            {isKakao ? "카카오" : "구글"}
          </p>
          <p className="text-xs text-gray-500">{email}</p>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
            <span className="text-xs text-green-600 font-medium">연결됨</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`inline-flex items-center rounded-lg border ${
          isKakao
            ? "border-yellow-300 text-yellow-700 hover:bg-yellow-50"
            : "border-blue-300 text-blue-700 hover:bg-blue-50"
        } bg-white px-4 py-2 text-xs font-medium shadow-sm`}
        onClick={() => toggleModal(true)}
      >
        연결 해제
      </button>
    </div>
  );
};
