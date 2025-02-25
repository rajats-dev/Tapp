/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { GROUP_URL } from "@/lib/apiAuthRoutes";
import useGroups from "../state/useGroups";
import { useQuery } from "@tanstack/react-query";

const useJoinedGroups = (token: string, enabled?: boolean) => {
  const { groupList, setGroupList } = useGroups();

  const { status } = useQuery({
    queryKey: ["joinedGroups"],
    queryFn: async () => {
      const res = await fetch(`${GROUP_URL}/joinedGroup`, {
        headers: { Authorization: token },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setGroupList([...data]); // ✅ Updating state directly
      return data;
    },
    enabled: enabled,
    refetchOnWindowFocus: false,
  });

  // return { status, groupList };
};

export default useJoinedGroups;
