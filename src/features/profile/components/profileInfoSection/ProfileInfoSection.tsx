import { IUserProfile } from "../../types/UserProfile";
import { ProfileInfoCard } from "./ProfileInfoCard";

export const ProfileInfoSection = ({ profile }: { profile: IUserProfile }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">프로필 정보</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileInfoCard title="이름" desc={profile.name} />
        <ProfileInfoCard title="이메일" desc={profile.email} />
        <ProfileInfoCard
          title="나의 포부"
          desc={profile.note || "부자가 되고 싶어요!"}
          styleClass="md:col-span-2"
        />
      </div>
    </div>
  );
};
