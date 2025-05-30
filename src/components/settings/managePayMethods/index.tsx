import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";
import { useAuth } from "@/contexts/AuthContext";
import { useSetRecoilState } from "recoil";
import { payMethodsState } from "@/recoil/atoms";
import { deleteItem, saveItem } from "@/utils/crud";
import { patchOrAddItem } from "@/utils/patchOrAddItem";
import { IPayMethod } from "@/types/expense-types";
import GenericForm from "../common/GenericForm";
import { FormType } from "../types/GenericFormTypes";
import { TableRow } from "./table/TableRow";
import { TableHeader } from "./table/TableHeader";

const ManagePayMethods = () => {
  const { userId } = useAuth();
  const payMethods = useFetchPayMethods();
  const setPayMethods = useSetRecoilState(payMethodsState);

  const handleDeletePayMethod = async (id: number) => {
    await deleteItem("payment_methods", id, () => {
      setPayMethods((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const handleSavePayMethod = async (payMethod: Partial<IPayMethod>) => {
    await saveItem("payment_methods", payMethod, userId!, (saved) => {
      setPayMethods((prev) => patchOrAddItem(prev, saved));
    });
  };

  return (
    <GenericForm<FormType.PayMethods>
      formType={FormType.PayMethods}
      headers={<TableHeader />}
      fetchData={payMethods}
      renderRow={(payMethod, { onEdit, onDelete }) => (
        <TableRow
          key={payMethod.id}
          payMethod={payMethod}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      onDelete={handleDeletePayMethod}
      onSave={handleSavePayMethod}
    />
  );
};

export default ManagePayMethods;
