"use client";

import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";
import { useUserProfile } from "../hooks/useUserProfile";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileAvatarCard } from "../components/ProfileAvatarCard";
import { ProfileInfoSection } from "../components/ProfileInfoSection";
import { ProfileStats } from "../components/ProfileStats";

const Profile = () => {
  // 샘플 데이터 - 소셜 로그인 사용자
  const profileData = {
    name: "홍길동", // user.name
    email: "user@example.com", // user.email
    phone: "010-1234-5678",
    bio: "안녕하세요! MoneyBook을 사용하여 재정 관리를 하고 있습니다.",
    // user.profileImage
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    joinDate: "2023년 1월 15일", // user 테이블에 추가하기
    connectedAccounts: [
      // user.provider
      { provider: "kakao", connected: true, email: "user@kakao.com" },
      { provider: "google", connected: true, email: "user@gmail.com" },
    ],
  };

  const { userId, user, logout } = useAuth();
  const { profile } = useUserProfile(
    userId,
    user && user.provider ? user.provider : undefined
  );
  if (!profile) return null;

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <ProfileHeader />

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 프로필 이미지 및 기본 정보 */}
          <ProfileAvatarCard profile={profile} logout={logout} />

          {/* 프로필 정보 및 통계 */}
          <div className="lg:col-span-2">
            {/* 프로필 정보 */}
            <ProfileInfoSection />

            {/* 통계 요약 */}
            <ProfileStats />

            {/* 연결된 소셜 계정 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
