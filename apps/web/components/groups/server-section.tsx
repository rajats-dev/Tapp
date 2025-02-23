"use client";

import ActionTooltip from "../action-tooltip";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/state/useModalStore";

interface ServerSectionProps {
  label: string;
}

const ServerSection = ({ label }: ServerSectionProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between py-2 px-2">
      <p className="flex items-center gap-2 text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <ActionTooltip label="Create Group" side="top">
        <button
          className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          onClick={() => onOpen("createGroup")}
        >
          <Plus className="w-4 h-4 " />
        </button>
      </ActionTooltip>
    </div>
  );
};

export default ServerSection;
