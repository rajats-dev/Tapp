"use client";

import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import AuthModal from "@/components/modal/auth-modal";
import CreateGroup from "@/components/modal/create-group-modal";
import DeleteGroupModal from "@/components/modal/delete-group-modal";
import DeleteMessageModal from "@/components/modal/delete-message-modal";
import InviteModal from "@/components/modal/invite-modal";
import { useSession } from "next-auth/react";

export const ModalProvider = () => {
  const { data } = useSession();

  const session: CustomSession | null = data;

  return (
    <>
      <CreateGroup user={session?.user} />
      <DeleteGroupModal user={session?.user} />
      <DeleteMessageModal user={session?.user} />
      <InviteModal />
      <AuthModal />
    </>
  );
};
