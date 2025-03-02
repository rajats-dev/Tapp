/* eslint-disable react-hooks/exhaustive-deps */
import useGroups from "../state/useGroups";
import { GROUP_URL } from "@/lib/apiAuthRoutes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGroupMessages = (token: string) => {
  const [loading, setLoading] = useState(false);
  const { groupMessage, setGroupMessage, selectedGroup } = useGroups();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedGroup) return;
      setLoading(true);
      setGroupMessage([]);
      try {
        const res = await fetch(
          `${GROUP_URL}/fetchGroupMessage/${selectedGroup.id}`,
          {
            headers: {
              Authorization: token,
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "An error occurred");
        setGroupMessage(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedGroup, setGroupMessage]);

  // useQuery({
  //   queryKey: ["groupMessage", selectedGroup?.id], // Depend on selectedGroup.id
  //   queryFn: async () => {
  //     if (!selectedGroup) return [];
  //     setLoading(true);
  //     setGroupMessage([]); // Reset messages before fetching
  //     const res = await fetch(
  //       `${GROUP_URL}/fetchGroupMessage/${selectedGroup.id}`,
  //       { headers: { Authorization: token }, credentials: "include" }
  //     );
  //     if (!res.ok) throw new Error("Failed to fetch");
  //     const data = await res.json();
  //     setGroupMessage(data);
  //     setLoading(false);
  //     return data;
  //   },
  //   enabled: !!selectedGroup, // Ensure the query runs only when selectedGroup is not null
  //   refetchOnWindowFocus: false,
  // });

  return { groupMessage, loading };
};
export default useGroupMessages;
