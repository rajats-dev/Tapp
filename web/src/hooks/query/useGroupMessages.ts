/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import useGroups from "../state/useGroups";
import { GROUP_URL } from "@/lib/apiAuthRoutes";
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

  return { groupMessage, loading };
};
export default useGroupMessages;
