import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation, { MessageType } from "../state/useConversation";
import useGroups, { GroupMessageType } from "../state/useGroups";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const { groupMessage, setGroupMessage } = useGroups();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: MessageType) => {
      setMessages([...messages, newMessage]);
    });

    socket?.on("recieve-group-message", (newMessage: GroupMessageType) => {
      setGroupMessage([...groupMessage, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("recieve-group-message");
    };
  }, [socket, messages, setMessages, groupMessage, setGroupMessage]);
};
export default useListenMessages;
