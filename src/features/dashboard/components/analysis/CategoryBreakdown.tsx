import { formatCurrency } from "@/utils/format";
import { ExternalLink, PieChart } from "lucide-react";
import { DonutChart } from "../DonutChart";

export const CategoryBreakdown = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm lg:col-span-1">
      <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">카테고리별 지출</h3>
        <button className="text-xs text-emerald-600 font-medium hover:text-emerald-700 flex items-center">
          자세히 보기
          <ExternalLink className="ml-1 h-3 w-3" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex flex-col items-center mb-6">
          <div className="relative h-48 w-48">
            <DonutChart data={categoryData} />
          </div>
        </div>

        <div className="space-y-3.5">
          {categoryData.map((category) => (
            <div key={category.name} className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${category.color} mr-3`} />
              <div className="flex-1 text-sm font-medium text-gray-700">
                {category.name}
              </div>
              <div className="text-sm font-medium text-gray-900">
                {formatCurrency(category.value)}
              </div>
              <div className="ml-2 text-xs text-gray-500 w-10 text-right">
                {category.percentage}%
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <button className="w-full text-center text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center justify-center">
            <PieChart className="mr-1.5 h-4 w-4" />
            예산 설정하기
          </button>
        </div>
      </div>
    </div>
  );
};
