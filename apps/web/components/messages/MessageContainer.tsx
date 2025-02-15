"use client";

import { useAuthContext } from "../../context/AuthContext";
import useConversation from "@/hooks/state/useConversation";
import { MessageCircle } from "lucide-react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-full h-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-[#121a27b1] px-4 py-2 mb-2">
            <span>To:</span>{" "}
            <span className="text-white font-bold">
              {selectedConversation?.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
