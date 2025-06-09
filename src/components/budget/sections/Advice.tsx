import { CardSection } from "@/components/common/layout/CardSection";
import { AlertCircle, ArrowRight } from "lucide-react";

export const Advice = () => {
  return (
    <CardSection title={"예산 조언"} className={"space-y-4"}>
      <>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                쇼핑 카테고리 주의
              </h3>
              <p className="mt-1 text-xs text-yellow-700">
                쇼핑 카테고리가 예산의 90%를 사용했습니다. 이번 달 지출을
                조절하는 것이 좋겠습니다.
              </p>
              <button className="mt-2 text-xs text-yellow-600 font-medium hover:text-yellow-700 flex items-center">
                지출 내역 보기
                <ArrowRight className="ml-1 h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                식비 카테고리 초과
              </h3>
              <p className="mt-1 text-xs text-red-700">
                식비 카테고리가 예산을 초과했습니다. 다음 달 예산을 조정하거나
                지출을 줄이는 것이 좋겠습니다.
              </p>
              <button className="mt-2 text-xs text-red-600 font-medium hover:text-red-700 flex items-center">
                예산 조정하기
                <ArrowRight className="ml-1 h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-emerald-800">
                의료/건강 카테고리 절약
              </h3>
              <p className="mt-1 text-xs text-emerald-700">
                의료/건강 카테고리는 예산의 12%만 사용했습니다. 잘 관리되고
                있습니다.
              </p>
              <button className="mt-2 text-xs text-emerald-600 font-medium hover:text-emerald-700 flex items-center">
                절약 팁 보기
                <ArrowRight className="ml-1 h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </>
    </CardSection>
  );
};
