import { Calendar, ChevronDown } from "lucide-react";
import { DateSelector } from "./DateSelector";

interface DateFilterControlProps {
  selectedDate: { year: number; month: number };
  showDateSelector: boolean;
  years: number[];
  closeDateSelector: () => void;
  handleChangeYear: (year: number) => void;
  handleChangeMonth: (month: number) => void;
}

export const DateFilterControl = ({
  selectedDate,
  showDateSelector,
  years,
  closeDateSelector,
  handleChangeYear,
  handleChangeMonth,
}: DateFilterControlProps) => {
  return (
    <div className="relative">
      <button
        className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        onClick={closeDateSelector}
      >
        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
        {selectedDate.year}년 {selectedDate.month}월
        <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
      </button>

      {showDateSelector && (
        <DateSelector
          selectedDate={selectedDate}
          years={years}
          handleChangeYear={handleChangeYear}
          handleChangeMonth={handleChangeMonth}
        />
      )}
    </div>
  );
};
