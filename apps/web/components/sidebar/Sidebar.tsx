"use client";
import React from "react";
import SearchInput from "./SearchInput";
import { Separator } from "../ui/separator";
import UserConversations from "./UserConversations";
import useGetConversations from "@/hooks/useGetConversation";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";

const Sidebar = ({ session }: { session: CustomSession }) => {
  const { conversations } = useGetConversations(session?.user?.token || "");

  return (
    <div className="h-full flex flex-col w-full  dark:bg-[#121a27b1] bg-[#F2F3F5] px-3">
      <SearchInput conversations={conversations} />
      <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-4" />
      <div className="divider px-3" />
      <UserConversations conversations={conversations} />
    </div>
  );
};

export default Sidebar;
