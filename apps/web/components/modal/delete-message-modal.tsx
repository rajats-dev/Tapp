"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import { useModal } from "@/hooks/state/useModalStore";
import { GROUP_URL } from "@/lib/apiAuthRoutes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import useGroups from "@/hooks/state/useGroups";

const DeleteMessageModal = ({ user }: { user: CustomUser | undefined }) => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { groupMessage, setGroupMessage } = useGroups();

  const isModalOpen = isOpen && type == "deleteMessage";
  const { messageId } = data;

  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${GROUP_URL}/deleteGroupMessage/${messageId}`,
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      if (data?.message) {
        const updatedMessage = groupMessage.filter(
          (item) => item.id !== messageId
        );
        setGroupMessage([]);
        setGroupMessage(updatedMessage);
        toast.success(data?.message);
        onClose();
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className=" text-center text-zinc-500">
            Are you sure you want to delete? <br />
            <span className="text-[#e93a3a]">
              This action can&apos;t be reversed!
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={loading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={loading} onClick={onClick} variant="default">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMessageModal;
