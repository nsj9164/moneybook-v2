import { IUserProfile } from "../types/UserProfile";

export const ProfileInfoSection = ({ profile }: IUserProfile) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">프로필 정보</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            이름
          </label>
          <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
            {profile.name}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            이메일
          </label>
          <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
            {profile.email}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            전화번호
          </label>
          <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
            {profile.phone}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            가입일
          </label>
          <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
            {profile.createdAt}
          </p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            자기소개
          </label>
          <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
            {profile.note}
          </p>
        </div>
      </div>
    </div>
  );
};
