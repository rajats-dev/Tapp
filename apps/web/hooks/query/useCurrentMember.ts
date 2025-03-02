import useGroups from "../state/useGroups";
import { GROUP_URL } from "@/lib/apiAuthRoutes";
import { useQuery } from "@tanstack/react-query";

const useCurrentMember = (token: string) => {
  const { selectedGroup } = useGroups();

  const { data } = useQuery({
    queryKey: ["currentMember", token],
    queryFn: async () => {
      const res = await fetch(
        `${GROUP_URL}/currentMember/${selectedGroup?.id}`,
        {
          headers: { Authorization: token },
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      return data;
    },
    // enabled: enabled,
    refetchOnWindowFocus: false,
  });
  return { data };
};
export default useCurrentMember;
