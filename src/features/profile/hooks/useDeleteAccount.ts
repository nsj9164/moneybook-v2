import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../api/deleteAccount";

export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const toggleModal = (type: boolean) => setOpen(type);

  const handleConfirmDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || !session) throw new Error("세션 정보가 없습니다.");

      const accessToken = session.access_token;

      await deleteAccount(accessToken);

      try {
        await supabase.auth.signOut({ scope: "local" });
      } catch {}

      setOpen(false);
      navigate("/login", { replace: true });
      toast.success("탈퇴가 완료되었습니다.");
    } catch (e: any) {
      toast.error(
        e?.message ?? "탈퇴에 실패했어요.\n잠시 후 다시 시도해 주세요."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return { open, toggleModal, isDeleting, handleConfirmDelete };
};
