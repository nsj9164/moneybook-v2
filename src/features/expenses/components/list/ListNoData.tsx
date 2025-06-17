import { ArrowRight, Download, Plus, Receipt, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export const ListNoData = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
        <Receipt className="h-8 w-8 text-emerald-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        지출 내역이 없습니다
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-md">
        아직 등록된 지출 내역이 없습니다. 지출을 추가하여 지출 관리를
        시작해보세요.
      </p>
      <Link
        to="/expenses/edit"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
      >
        <Plus className="mr-2 -ml-1 h-4 w-4" />첫 지출 추가하기
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
      <div className="mt-8 border-t border-gray-200 pt-6 w-full max-w-md">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          다른 방법으로 시작하기
        </h4>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Download className="mr-2 -ml-1 h-4 w-4" />
            템플릿 다운로드
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Upload className="mr-2 -ml-1 h-4 w-4" />
            엑셀 파일 가져오기
          </button>
        </div>
      </div>
    </div>
  );
};
