import { useAuth } from "@/contexts/AuthContext";
import { useSetRecoilState } from "recoil";
import { payMethodsState } from "@/recoil/atoms";
import { PayMethodEntity } from "@/types";
import GenericForm from "@/features/settings/components/common/form/GenericForm";
import { FormType } from "@/features/settings/types/GenericFormTypes";
import { TableHeader } from "../components/TableHeader";
import { TableRow } from "../components/TableRow";
import { useFetchPayMethods } from "@/hooks/fetchData/useFetchPayMethods";
import {
  createUpsertHandler,
  createDeleteItemHandler,
} from "@/utils/crudHandlers";

const ManagePayMethods = () => {
  const { userId } = useAuth();
  const payMethods = useFetchPayMethods();
  const setPayMethods = useSetRecoilState(payMethodsState);

  const handleSavePayMethod = createUpsertHandler<PayMethodEntity>(
    "payment_methods",
    userId!,
    setPayMethods
  );

  const handleDeletePayMethod = createDeleteItemHandler<PayMethodEntity>(
    "payment_methods",
    setPayMethods
  );

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
