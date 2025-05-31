import { Plus } from "lucide-react";

interface GenericFormHeaderProps {
  title: string;
  handleAddData: () => void;
}
export const GenericFormHeader = ({
  title,
  handleAddData,
}: GenericFormHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-medium">{title} 관리</h2>
      <button
        onClick={handleAddData}
        className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        {title} 추가
      </button>
    </div>
  );
};
