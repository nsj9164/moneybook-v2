import { IPayMethod } from "@/types/expense-types";
import { TableRow } from "./TableRow";

interface TableProps {
  payMethods: IPayMethod[];
  handleEditPayMethod: (payment: IPayMethod) => void;
  handleDeletePayMethod: (id: number) => void;
}

export const Table = ({
  payMethods,
  handleEditPayMethod,
  handleDeletePayMethod,
}: TableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
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
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {payMethods.map((method) => (
          <TableRow
            key={method.id}
            method={method}
            handleEditPayMethod={handleEditPayMethod}
            handleDeletePayMethod={handleDeletePayMethod}
          />
        ))}
      </tbody>
    </table>
  );
};
