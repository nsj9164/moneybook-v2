import { useAuth } from "@/contexts/AuthContext";
import { useSetRecoilState } from "recoil";
import { payMethodsState } from "@/recoil/atoms";
import { deleteItem, insertItem, updateItem } from "@/utils/crud";
import { patchOrAddItem } from "@/utils/patchOrAddItem";
import { PayMethodEntity } from "@/types";
import GenericForm from "@/features/settings/components/common/form/GenericForm";
import { FormType } from "@/features/settings/types/GenericFormTypes";
import { TableHeader } from "../components/TableHeader";
import { TableRow } from "../components/TableRow";
import { useFetchPayMethods } from "@/hooks/fetchData/useFetchPayMethods";

const ManagePayMethods = () => {
  const { userId } = useAuth();
  const payMethods = useFetchPayMethods();
  const setPayMethods = useSetRecoilState(payMethodsState);

  const handleDeletePayMethod = async (id: number) => {
    await deleteItem("payment_methods", id, () => {
      setPayMethods((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const handleSavePayMethod = async (payMethod: Partial<PayMethodEntity>) => {
    const isEditing = "id" in payMethod && typeof payMethod.id === "number";

    const saveFn = isEditing
      ? updateItem<PayMethodEntity>
      : insertItem<PayMethodEntity>;
    await saveFn("payment_methods", payMethod, userId!, (saved) => {
      setPayMethods((prev) => patchOrAddItem(prev, saved));
    });
  };

  return (
    <GenericForm<FormType.PayMethods>
      formType={FormType.PayMethods}
      headers={<TableHeader />}
      fetchData={payMethods}
      renderRow={(payMethod, { openModal, onDelete }) => (
        <TableRow
          key={payMethod.id}
          payMethod={payMethod}
          openModal={openModal}
          onDelete={onDelete}
        />
      )}
      onDelete={handleDeletePayMethod}
      onSave={handleSavePayMethod}
    />
  );
};

export default ManagePayMethods;
