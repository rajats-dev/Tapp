import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation, { MessageType } from "./state/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: MessageType) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};
export default useListenMessages;
