"use client";

import useConversation from "@/hooks/state/useConversation";
import { MessageCircle } from "lucide-react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";

const MessageContainer = ({ session }: { session: CustomSession }) => {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-full h-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected session={session} />
      ) : (
        <>
          {/* Header */}
          <div className="bg-[#121a27b1] px-4 py-2 mb-2">
            <span>To:</span>{" "}
            <span className="text-white font-bold">
              {selectedConversation?.name}
            </span>
          </div>

          <Messages session={session} />
          <MessageInput session={session} />
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
