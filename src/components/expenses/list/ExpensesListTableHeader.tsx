export const ExpensesListTableHeader = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="w-12 px-6 py-4 sm:w-16 sm:px-8">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            checked={
              selectedItems.length === filteredExpenses.length &&
              filteredExpenses.length > 0
            }
            onChange={toggleSelectAll}
          />
        </th>
        {columns.map(
          (col) =>
            col.visible && (
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
              >
                {col.name}
              </th>
            )
        )}
        <th
          scope="col"
          className="px-6 py-4 text-right text-sm font-semibold text-gray-900"
        >
          액션
        </th>
      </tr>
    </thead>
  );
};
