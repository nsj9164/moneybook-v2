import { ReactNode } from "react";

interface GenericFormTableProps<T> {
  headers: string[];
  rows: T[];
  renderRow: (row: T) => ReactNode;
}

export function GenericFormTable<T>({
  headers,
  rows,
  renderRow,
}: GenericFormTableProps<T>) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map((row) => renderRow(row))}
      </tbody>
    </table>
  );
}
