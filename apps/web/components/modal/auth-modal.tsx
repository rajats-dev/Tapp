import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/hooks/state/useModalStore";
import AuthScreen from "@/features/auth/components/auth-screen";

const AuthModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type == "auth";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="w-fit"
      >
        <AuthScreen />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
