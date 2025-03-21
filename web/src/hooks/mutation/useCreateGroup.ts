/* eslint-disable @typescript-eslint/no-explicit-any */
import { GROUP_URL } from "@/lib/apiAuthRoutes";
import axios from "axios";
import toast from "react-hot-toast";
import useGroups from "../state/useGroups";

const useCreateGroup = (token: string) => {
  const { groupList, setGroupList } = useGroups();

  const createGroup = async (value: any) => {
    try {
      const res = await axios.post(`${GROUP_URL}/createGroup`, value, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status == 200) {
        toast.success("Group created successfully!");
      }
      console.log(res);
      setGroupList([...groupList, ...res.data]);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { createGroup };
};

export default useCreateGroup;
