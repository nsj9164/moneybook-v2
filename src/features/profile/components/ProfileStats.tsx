export const ProfileStats = () => {
  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">사용 통계</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">총 지출 기록</p>
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
          <p className="text-sm font-medium text-gray-500">총 지출 금액</p>
          <p className="text-2xl font-bold text-red-600 mt-2">12,450,000원</p>
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
          <p className="text-sm font-medium text-gray-500">평균 월 지출</p>
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
  );
};
