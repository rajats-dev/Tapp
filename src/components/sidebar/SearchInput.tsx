/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useConversation from "@/hooks/state/useConversation";
import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const SearchInput = (conversations: any) => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c: ConversationType) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form className="pt-5" onSubmit={handleSubmit}>
      <div
        className="group p-2 rounded-md flex items-center gap-x-2 w-full
        hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition bg-zinc-700/30"
      >
        <input
          type="text"
          placeholder="Search…"
          className="bg-transparent outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      </div>
    </form>
  );
};
export default SearchInput;
