import { RecurringDisplay, RecurringSaved } from "@/types";
import { RecurringCardItem } from "./RecurringCardItem";

interface RecurringCardListProps {
  data: RecurringDisplay[];
  openModal: (expense: RecurringSaved) => void;
  onDelete: (id: number) => void;
}

export const RecurringCardList = ({
  data,
  openModal,
  onDelete,
}: RecurringCardListProps) => {
  if (data.length === 0) {
    return (
      <div className="md:col-span-2 p-8 text-center text-gray-500">
        <p>검색 조건에 맞는 고정지출이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((item) => (
        <RecurringCardItem
          key={item.id}
          expense={item}
          openModal={() => openModal(item)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
