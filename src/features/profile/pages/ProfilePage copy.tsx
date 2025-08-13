import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "../hooks/useUserProfile";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileAvatarCard } from "../components/ProfileAvatarCard";
import { ProfileInfoSection } from "../components/profileInfoSection/ProfileInfoSection";
import { ProfileStats } from "../components/profileStats/ProfileStats";
import { ProfileSocialSection } from "../components/ProfileSocialSection";
import { useFetchUserSummary } from "../hooks/useFetchUserSummary";
import { deleteAccount } from "../api/deleteAccount";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ConfirmModal } from "@/components/common/modal/ConfirmModal";
import { supabase } from "@/utils/supabase";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const toggleModal = (type: boolean) => setOpen(type);

  const { userId, logout } = useAuth();
  const { profile } = useUserProfile(userId);

  const totalSummary = useFetchUserSummary({ userId: userId! });

  const handleConfirmDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteAccount();
      try {
        await supabase.auth.signOut({ scope: "local" });
      } catch {}
      toast.success("탈퇴가 완료되었습니다.");
      navigate("/login", { replace: true });
      setOpen(false);
    } catch (e: any) {
      toast.error(
        e?.message ?? "탈퇴에 실패했어요.\n잠시 후 다시 시도해 주세요."
      );
    } finally {
      setIsDeleting(false);
    }
  };

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
              toggleModal={toggleModal}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={open}
        onClose={toggleModal}
        onConfirm={handleConfirmDelete}
        title="정말 탈퇴하시겠어요?"
        description="모든 데이터가 삭제되고 복구할 수 없어요."
        confirmText="탈퇴하기"
        cancelText="취소"
        disabled={isDeleting}
      />
    </div>
  );
};

export default Profile;
