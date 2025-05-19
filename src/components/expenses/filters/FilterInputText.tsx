import { Search } from "lucide-react";

interface FilterInputTextProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterInputText = ({ value, onChange }: FilterInputTextProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        name="filterQuery"
        placeholder="설명 또는 메모 검색..."
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm pl-10"
        value={value}
        onChange={onChange}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};
