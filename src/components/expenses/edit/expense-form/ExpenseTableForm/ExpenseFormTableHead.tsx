export const ExpenseFormTableHead = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
          날짜
        </th>
        <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
          카테고리
        </th>
        <th className="w-[20%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
          항목
        </th>
        <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
          결제금액
        </th>
        <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
          실제지출
        </th>
        <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
          결제수단
        </th>
        <th className="w-[15%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
          메모
        </th>
        <th className="w-[5%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
          삭제
        </th>
      </tr>
    </thead>
  );
};
