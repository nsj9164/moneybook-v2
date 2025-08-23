import { useAuth } from "@/contexts/AuthContext";
import { useSetRecoilState } from "recoil";
import { payMethodsState } from "@/recoil/atoms";
import { PayMethodBase, PayMethodInsertDto, PayMethodSaved } from "@/types";
import GenericForm from "@/features/settings/components/common/form/GenericForm";
import { FormType } from "@/features/settings/types/GenericFormTypes";
import { TableHeader } from "../managePayMethods/components/TableHeader";
import { TableRow } from "../managePayMethods/components/TableRow";
import { useFetchPayMethods } from "@/hooks/fetchData/useFetchPayMethods";
import {
  createUpsertHandler,
  createDeleteHandler,
} from "@/utils/createUpsertHandler";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { ConfirmModal } from "@/components/common/modal/ConfirmModal";

const ManagePayMethods = () => {
  const { userId } = useAuth();
  const payMethods = useFetchPayMethods();
  const setPayMethods = useSetRecoilState(payMethodsState);

  const { upsertOne } = createUpsertHandler<PayMethodInsertDto, PayMethodSaved>(
    "payment_methods",
    userId!,
    setPayMethods
  );

  const handleSavePayMethod = async (
    data: PayMethodInsertDto | Partial<PayMethodSaved>
  ) => {
    return await upsertOne(data);
  };

  const handleDeletePayMethod = createDeleteHandler<PayMethodSaved>(
    "payment_methods",
    setPayMethods
  );

  const { isConfirm, openConfirm, closeConfirm, handleConfirm } =
    useConfirmModal<number>(handleDeletePayMethod);

  return (
    <>
      <GenericForm<FormType.PayMethods>
        formType={FormType.PayMethods}
        headers={<TableHeader />}
        fetchData={payMethods}
        renderRow={(payMethod, { openModal }) => (
          <TableRow
            key={payMethod.id}
            payMethod={payMethod}
            openModal={openModal}
            openConfirm={openConfirm}
          />
        )}
        onSave={handleSavePayMethod}
      />

      <ConfirmModal
        isOpen={isConfirm}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ManagePayMethods;
