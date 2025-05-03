export const ExpensesTableHead = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
          <input
            type="checkbox"
            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          날짜
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          카테고리
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          설명
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          결제 수단
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
        >
          금액
        </th>
      </tr>
    </thead>
  );
};
