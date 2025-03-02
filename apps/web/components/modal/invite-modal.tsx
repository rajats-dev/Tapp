"use client";
import { useModal } from "@/hooks/state/useModalStore";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/state/use-origin";
import axios from "axios";

const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type == "invite";
  const { group } = data;

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${group?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // const onNew = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.patch(
  //       `/api/servers/${server?.id}/invite-code`
  //     );
  //     onOpen("invite", { server: response.data });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={loading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
              readOnly
            />
            <Button disabled={loading} onClick={onCopy} size="icon">
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          {/* <Button
            disabled={loading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
            // onClick={onNew}
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
