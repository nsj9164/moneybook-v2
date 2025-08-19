import { useState, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

export function useConfirmModal<T>(
  onConfirm: (payload: T) => Promise<void> | void
) {
  const [isConfirm, setIsConfirm] = useState(false);
  const [payload, setPayload] = useState<T | null>(null);
  console.log("#############", payload);

  useEffect(() => {
    console.log("???????????????", payload);
  }, [payload]);

  const openConfirm = (value: T) => {
    console.log("openConfirm:::", payload, value);
    setPayload(value);
    setIsConfirm(true);
  };
  const closeConfirm = () => {
    console.log("closeConfirm:::", payload);
    setIsConfirm(false);
    setPayload(null);
  };

  const handleConfirm = useCallback(async () => {
    console.log("payload3:::", payload);
    if (payload == null) return;
    try {
      console.log("#######1");
      await onConfirm(payload);
      console.log("#######2");
      toast.success("삭제가 완료되었습니다.");
      closeConfirm();
    } catch (err) {
      toast.error("항목 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.");
      console.error(err);
    }
  }, [onConfirm]);

  return {
    isConfirm,
    openConfirm,
    closeConfirm,
    handleConfirm,
  };
}
