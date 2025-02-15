import React from "react";
import SearchInput from "./SearchInput";
import { Separator } from "../ui/separator";
import UserConversations from "./UserConversations";

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col w-full  dark:bg-[#121a27b1] bg-[#F2F3F5] px-3">
      <SearchInput />
      <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-4" />
      <div className="divider px-3" />
      <UserConversations />
    </div>
  );
};

export default Sidebar;
