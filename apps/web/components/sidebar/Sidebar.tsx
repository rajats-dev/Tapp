"use client";
import React from "react";
import SearchInput from "./SearchInput";
import { Separator } from "../ui/separator";
import UserConversations from "./UserConversations";
import useGetConversations from "@/hooks/query/useGetConversation";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import ServerSection from "../groups/server-section";
import ServerGroups from "../groups/server-group";
import useFetchGroups from "@/hooks/query/useFetchGroups";
import Loader from "../ui/loader";

const Sidebar = ({ session }: { session: CustomSession }) => {
  const token = session?.user?.token || "";
  const { conversations } = useGetConversations(session?.user?.token || "");
  const { groupList, isLoading } = useFetchGroups(token, token !== undefined);

  console.log(groupList);

  return (
    <div className="h-full flex flex-col w-full  dark:bg-[#121a27b1] bg-[#F2F3F5] px-3">
      <SearchInput conversations={conversations} />
      <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-4" />
      <ServerSection label="Your Groups" />

      {isLoading && <Loader />}
      {!!groupList?.length && (
        <div className="mb-2">
          <div className="space-y-[2px]">
            {groupList?.map((grp, index) => (
              <ServerGroups group={grp} key={index} session={session} />
            ))}
          </div>
        </div>
      )}
      <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-4" />
      <UserConversations conversations={conversations} />
    </div>
  );
};

export default Sidebar;
