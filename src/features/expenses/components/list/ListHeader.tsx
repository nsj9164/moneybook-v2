import { Button } from "@/components/ui/Button";
import { Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface ListHeaderProps {
  chkListCnt: number;
  toggleFilterPanel: () => void;
}

export const ListHeader = ({
  chkListCnt,
  toggleFilterPanel,
}: ListHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">지출 관리</h1>
          <p className="mt-1 text-sm text-gray-500">
            모든 지출 내역을 관리하고 분석하세요. 총 {chkListCnt}개의 지출
            내역이 있습니다.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outlineWhite" onClick={toggleFilterPanel}>
            <Filter className="mr-1.5 -ml-0.5 h-4 w-4" />
            필터
          </Button>
          <Link
            to="/expenses/edit"
            className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
          >
            <Plus className="mr-1.5 -ml-0.5 h-4 w-4" />
            지출 추가
          </Link>
        </div>
      </div>
    </div>
  );
};
