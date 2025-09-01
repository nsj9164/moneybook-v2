import { ProviderType } from "@/features/auth/types/auth";
import { AlertCircle } from "lucide-react";
import { SocialAccountCard } from "./SocialAccountCard";

interface ProfileSocialSectionProps {
  providers: ProviderType[];
  email: string;
  toggleModal: (type: boolean) => void;
}

export const ProfileSocialSection = ({
  providers,
  email,
  toggleModal,
}: ProfileSocialSectionProps) => {
  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        연결된 소셜 계정
      </h3>
      <div className="space-y-4">
        {providers.map((provider, index) => (
          <SocialAccountCard
            key={index}
            provider={provider}
            email={email}
            toggleModal={toggleModal}
          />
        ))}
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
