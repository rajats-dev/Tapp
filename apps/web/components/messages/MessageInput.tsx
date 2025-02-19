import { Send } from "lucide-react";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "@/context/SocketContext";
import useConversation, { MessageType } from "@/hooks/state/useConversation";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "@/context/AuthContext";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";

const MessageInput = ({ session }: { session: CustomSession }) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  // const { loading, sendMessage } = useSendMessage();
  // const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const payload: MessageType = {
      id: uuidv4(),
      body: inputMessage,
      senderId: session.user?.id || "",
      receiverId: selectedConversation?.id,
      createdAt: new Date().toISOString(),
    };

    socket?.emit("message", payload);
    setInputMessage("");
    setMessages([...messages, payload]);
  };
  return (
    <form className="px-4 mb-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {/* {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <Send className="w-6 h-6 text-white" />
            )} */}
          <Send className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
