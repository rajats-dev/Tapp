/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../state/useConversation";
import { CHAT_URL } from "@/lib/apiAuthRoutes";

const useGetMessages = (token: string) => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return;
      setLoading(true);
      setMessages([]);
      try {
        const res = await fetch(`${CHAT_URL}/${selectedConversation.id}`, {
          headers: {
            Authorization: token,
          },
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "An error occurred");
        setMessages(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
