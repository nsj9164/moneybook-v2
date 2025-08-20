import { useState, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

export function useConfirmModal<T>(
  onConfirm: (payload: T) => Promise<void> | void
) {
  const [isConfirm, setIsConfirm] = useState(false);
  const [payload, setPayload] = useState<T | null>(null);

  useEffect(() => {}, [payload]);

  const openConfirm = (value: T) => {
    setPayload(value);
    setIsConfirm(true);
  };
  const closeConfirm = () => {
    setIsConfirm(false);
    setPayload(null);
  };

  const handleConfirm = useCallback(async () => {
    if (payload == null) return;
    try {
      await onConfirm(payload);
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
