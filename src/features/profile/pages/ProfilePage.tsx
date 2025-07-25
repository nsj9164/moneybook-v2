import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "../hooks/useUserProfile";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileAvatarCard } from "../components/ProfileAvatarCard";
import { ProfileInfoSection } from "../components/ProfileInfoSection";
import { ProfileStats } from "../components/ProfileStats";
import { ProfileSocialSection } from "../components/ProfileSocialSection";
import { useFetchUserSummary } from "../hooks/useFetchUserSummary";

const Profile = () => {
  const { userId, user, logout } = useAuth();
  const { profile } = useUserProfile(
    userId,
    user && user.provider ? user.provider : undefined
  );

  const totalSummary = useFetchUserSummary({ userId: userId! });

  if (!profile) return null;

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <ProfileHeader />

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 프로필 이미지 및 기본 정보 */}
          <ProfileAvatarCard
            image={profile.profileImage ?? "/placeholder.svg"}
            name={profile.name ?? "이름 정보 없음"}
            email={profile.email}
            createdAt={profile.createdAt}
            logout={logout}
          />

          {/* 프로필 정보 및 통계 */}
          <div className="lg:col-span-2">
            {/* 프로필 정보 */}
            <ProfileInfoSection profile={profile} />

            {/* 통계 요약 */}
            <ProfileStats totalSummary={totalSummary} />

            {/* 연결된 소셜 계정 */}
            <ProfileSocialSection
              provider={profile.provider}
              email={profile.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
