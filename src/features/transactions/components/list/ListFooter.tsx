import { Button } from "@/components/ui/Button";

export const ListFooter = ({
  filteredDataLen,
}: {
  filteredDataLen: number;
}) => {
  return (
    <div className="border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            총 <span className="font-medium">{filteredDataLen}</span> 항목
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outlineWhite">이전</Button>
          <Button variant="outlineWhite">다음</Button>
        </div>
      </div>
    </div>
  );
};
