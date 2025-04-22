import { Camera, Edit2, Mail, Phone, User } from "lucide-react";

const Profile = () => {
  // 샘플 데이터
  const profileData = {
    name: "홍길동",
    email: "user@example.com",
    phone: "010-1234-5678",
    bio: "안녕하세요! MoneyBook을 사용하여 재정 관리를 하고 있습니다.",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          프로필
        </h1>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <Edit2 className="mr-2 -ml-1 h-4 w-4" />
          편집
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 프로필 이미지 */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
            <div className="relative">
              <img
                src={profileData.profileImage || "/placeholder.svg"}
                alt="프로필 이미지"
                className="h-32 w-32 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0">
                <label
                  htmlFor="profile-image"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">프로필 이미지 변경</span>
                  <input id="profile-image" type="file" className="hidden" />
                </label>
              </div>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              {profileData.name}
            </h2>
            <p className="text-sm text-gray-500">{profileData.email}</p>
          </div>

          {/* 계정 정보 */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              계정 정보
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">가입일</p>
                  <p className="text-sm text-gray-900">2023년 1월 15일</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">이메일</p>
                  <p className="text-sm text-gray-900">{profileData.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">전화번호</p>
                  <p className="text-sm text-gray-900">{profileData.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 프로필 정보 */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              프로필 정보
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  이름
                </label>
                <p className="mt-1 text-sm text-gray-900">{profileData.name}</p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  이메일
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {profileData.email}
                </p>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  전화번호
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {profileData.phone}
                </p>
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  자기소개
                </label>
                <p className="mt-1 text-sm text-gray-900">{profileData.bio}</p>
              </div>
            </div>
          </div>

          {/* 통계 요약 */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              통계 요약
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">총 지출 기록</p>
                <p className="text-2xl font-bold text-gray-900">248건</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">총 지출 금액</p>
                <p className="text-2xl font-bold text-red-600">12,450,000원</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">평균 월 지출</p>
                <p className="text-2xl font-bold text-emerald-600">
                  2,075,000원
                </p>
              </div>
            </div>
          </div>

          {/* 연결된 계정 */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              연결된 계정
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
                    <span className="text-sm font-medium text-white">K</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">카카오</p>
                    <p className="text-xs text-gray-500">연결됨</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  연결 해제
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300">
                    <span className="text-sm font-medium text-gray-500">G</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">구글</p>
                    <p className="text-xs text-gray-500">연결됨</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  연결 해제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
