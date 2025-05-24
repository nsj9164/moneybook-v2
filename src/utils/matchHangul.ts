import Hangul from "hangul-js";

// 한글 초성 검색
export const matchHangul = (filterValue: string, expenseValue: string) => {
  const normalize = (str: string) =>
    Hangul.disassemble(str.toLowerCase().trim()).join("");
  return normalize(expenseValue).includes(normalize(filterValue));
};
