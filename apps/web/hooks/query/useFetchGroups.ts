import { GROUP_URL } from "@/lib/apiAuthRoutes";
import useGroups from "../state/useGroups";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useFetchGroups = (token: string, enabled?: boolean) => {
  const { groupList, setGroupList } = useGroups();

  const { status, refetch } = useQuery({
    queryKey: ["groups", token],
    queryFn: async () => {
      const res = await fetch(`${GROUP_URL}/fetchGroup`, {
        headers: { Authorization: token },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      console.log(data);
      setGroupList([...data]); // ✅ Updating state directly
      toast.success("Fetching Groups Successfully");
      return data;
    },
    enabled: enabled,
    refetchOnWindowFocus: false,
  });

  return { status, groupList, refetch };
};

export default useFetchGroups;
