"use client";

import useConversation from "@/hooks/state/useConversation";
import { MessageCircle } from "lucide-react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import useGroups, { Role, type, useType } from "@/hooks/state/useGroups";
import GroupMessages from "./group/GroupMessages";
import { MemberList } from "../memberList";

const MessageContainer = ({ session }: { session: CustomSession }) => {
  const { selectedConversation } = useConversation();
  const { groupList, selectedGroup } = useGroups();
  const { selectedType } = useType();

  const groupSelected = selectedType == type.Group;
  // const { data: currentMember } = useCurrentMember(session.user?.token || "");

  const role: Role =
    selectedGroup?.creatorId == session?.user?.id ? "ADMIN" : "GUEST";

  const memberList = groupList?.find(
    (grp) => grp.id === selectedGroup?.id
  )?.groupMember;

  return (
    <div className="w-full h-full flex flex-col">
      {!selectedConversation && !selectedGroup ? (
        <NoChatSelected session={session} />
      ) : (
        <>
          {/* Header */}
          <div className="bg-[#121a27b1] px-4 py-2 mb-2 gap-8 flex items-center">
            <span className="text-white font-bold">
              To:{" "}
              {groupSelected ? selectedGroup?.name : selectedConversation?.name}
            </span>
            {groupSelected && <MemberList list={memberList} />}
          </div>

          {groupSelected ? (
            <GroupMessages session={session} role={role} />
          ) : (
            <Messages session={session} />
          )}
          <MessageInput session={session} role={role} />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = ({ session }: { session: CustomSession }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {session.user?.name} ❄</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
