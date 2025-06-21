import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Camera, LogOut, User } from "lucide-react";

interface ProfileAvatarCardProps {
  image: string;
  name: string;
  email: string;
  createdAt: Date;
  logout: () => void;
}

export const ProfileAvatarCard = ({
  image,
  name,
  email,
  createdAt,
  logout,
}: ProfileAvatarCardProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center">
        <div className="relative">
          <img
            src={image || "/placeholder.svg"}
            alt="프로필 이미지"
            className="h-32 w-32 rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0">
            <label
              htmlFor="profile-image"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white cursor-pointer shadow-sm hover:bg-emerald-700"
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">프로필 이미지 변경</span>
              <input id="profile-image" type="file" className="hidden" />
            </label>
          </div>
        </div>
        <h2 className="mt-6 text-xl font-semibold text-gray-900">{name}</h2>
        <p className="text-sm text-gray-500">{email}</p>

        {/* 소셜 로그인 표시 */}
        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          소셜 계정으로 로그인
        </div>

        <div className="mt-8 w-full border-t border-gray-100 pt-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">가입일</p>
                <p className="text-sm text-gray-900">
                  {format(createdAt, "PPP", { locale: ko })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <LogOut className="mr-2 h-4 w-4" />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};
