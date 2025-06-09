"use client";

import {
  Camera,
  Edit2,
  User,
  CreditCard,
  LogOut,
  AlertCircle,
} from "lucide-react";

const Profile = () => {
  // 샘플 데이터 - 소셜 로그인 사용자
  const profileData = {
    name: "홍길동",
    email: "user@example.com",
    phone: "010-1234-5678",
    bio: "안녕하세요! MoneyBook을 사용하여 재정 관리를 하고 있습니다.",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    joinDate: "2023년 1월 15일",
    connectedAccounts: [
      { provider: "kakao", connected: true, email: "user@kakao.com" },
      { provider: "google", connected: true, email: "user@gmail.com" },
    ],
  };

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
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

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 프로필 이미지 및 기본 정보 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center">
              <div className="relative">
                <img
                  src={profileData.profileImage || "/placeholder.svg"}
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
              <h2 className="mt-6 text-xl font-semibold text-gray-900">
                {profileData.name}
              </h2>
              <p className="text-sm text-gray-500">{profileData.email}</p>

              {/* 소셜 로그인 표시 */}
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                소셜 계정으로 로그인
              </div>

              <div className="mt-8 w-full border-t border-gray-100 pt-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        가입일
                      </p>
                      <p className="text-sm text-gray-900">
                        {profileData.joinDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        결제 정보
                      </p>
                      <p className="text-sm text-gray-900">등록된 카드 2개</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 w-full">
                <button className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </button>
              </div>
            </div>
          </div>

          {/* 프로필 정보 및 통계 */}
          <div className="lg:col-span-2">
            {/* 프로필 정보 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                프로필 정보
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    이름
                  </label>
                  <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    이메일
                  </label>
                  <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    전화번호
                  </label>
                  <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData.phone}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    가입일
                  </label>
                  <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData.joinDate}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    자기소개
                  </label>
                  <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {profileData.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* 통계 요약 */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                사용 통계
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">
                    총 지출 기록
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">248건</p>
                  <div className="mt-4 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                    <span className="ml-3 text-xs text-gray-500">75%</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">
                    총 지출 금액
                  </p>
                  <p className="text-2xl font-bold text-red-600 mt-2">
                    12,450,000원
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-red-500"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <span className="ml-3 text-xs text-gray-500">85%</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">
                    평균 월 지출
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 mt-2">
                    2,075,000원
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <span className="ml-3 text-xs text-gray-500">60%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 연결된 소셜 계정 */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                연결된 소셜 계정
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
                      <span className="text-sm font-medium text-white">K</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        카카오
                      </p>
                      <p className="text-xs text-gray-500">user@kakao.com</p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                        <span className="text-xs text-green-600 font-medium">
                          연결됨
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-lg border border-yellow-300 bg-white px-4 py-2 text-xs font-medium text-yellow-700 shadow-sm hover:bg-yellow-50"
                  >
                    연결 해제
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-300">
                      <span className="text-sm font-medium text-blue-600">
                        G
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">구글</p>
                      <p className="text-xs text-gray-500">user@gmail.com</p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                        <span className="text-xs text-green-600 font-medium">
                          연결됨
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-lg border border-blue-300 bg-white px-4 py-2 text-xs font-medium text-blue-700 shadow-sm hover:bg-blue-50"
                  >
                    연결 해제
                  </button>
                </div>
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
                      최소 하나의 소셜 계정은 연결되어 있어야 합니다. 모든
                      계정을 연결 해제하면 로그인할 수 없게 됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
