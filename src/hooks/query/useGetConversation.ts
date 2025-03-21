import { CHAT_URL } from "@/lib/apiAuthRoutes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = (token: string) => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await fetch(`${CHAT_URL}/conversations`, {
        headers: { Authorization: token },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setConversations(data);
      toast.success("Fetching Coversation Successfully");
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return { conversations };
};

export default useGetConversations;
