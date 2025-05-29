export const TableHeader = () => {
  return (
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        아이콘
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        결제수단명
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
      >
        상태
      </th>
      <th scope="col" className="relative px-6 py-3">
        <span className="sr-only">편집</span>
      </th>
    </tr>
  );
};
