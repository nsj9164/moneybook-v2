import { Download } from "lucide-react";

export const ExportButton = () => {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
    >
      <Download className="mr-2 -ml-1 h-4 w-4" />
      내보내기
    </button>
  );
};
