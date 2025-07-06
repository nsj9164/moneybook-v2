export interface DateFilterState {
  selectedDate: {
    year: number;
    month: number;
  };
  years: number[];
  showDateSelector: boolean;
  toggleDateSelector: () => void;
  handleChangeYear: (year: number) => void;
  handleChangeMonth: (month: number) => void;
}
