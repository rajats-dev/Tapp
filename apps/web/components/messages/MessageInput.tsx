import { Send } from "lucide-react";
import { useState } from "react";
import { useSocketContext } from "@/context/SocketContext";
import useConversation, { MessageType } from "@/hooks/state/useConversation";
import { v4 as uuidv4 } from "uuid";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import useGroups, {
  GroupMessageType,
  type,
  useType,
} from "@/hooks/state/useGroups";

const MessageInput = ({ session }: { session: CustomSession }) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { groupMessage, setGroupMessage, selectedGroup } = useGroups();
  const { selectedType } = useType();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (selectedType === type.Group) {
      const payload: GroupMessageType = {
        id: uuidv4(),
        body: inputMessage,
        memberName: session?.user?.name || "user",
        senderId: session.user?.id || "",
        groupId: selectedGroup?.id,
        createdAt: new Date().toISOString(),
      };
      socket?.emit("groupMessage", payload);
      setGroupMessage([...groupMessage, payload]);
    } else {
      const payload: MessageType = {
        id: uuidv4(),
        body: inputMessage,
        senderId: session.user?.id || "",
        receiverId: selectedConversation?.id,
        createdAt: new Date().toISOString(),
      };

      socket?.emit("message", payload);
      setMessages([...messages, payload]);
    }
    setInputMessage("");
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
          <Send className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
