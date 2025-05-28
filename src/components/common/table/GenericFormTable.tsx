import { ReactNode } from "react";

interface GenericFormTableProps<T> {
  headers: ReactNode;
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
      <thead className="bg-gray-50">{headers}</thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {rows.map((row) => renderRow(row))}
      </tbody>
    </table>
  );
}
