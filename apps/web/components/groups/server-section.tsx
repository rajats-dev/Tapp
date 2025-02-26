"use client";

import ActionTooltip from "../action-tooltip";
import { Plus, RefreshCcw } from "lucide-react";
import { useModal } from "@/hooks/state/useModalStore";
import { useState } from "react";

interface ServerSectionProps {
  label: string;
  refetch: () => void;
}

const ServerSection = ({ label, refetch }: ServerSectionProps) => {
  const { onOpen } = useModal();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = async () => {
    setIsSpinning(true);
    refetch(); // Wait for refetch to complete
    setTimeout(() => {
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-between py-2 px-2">
      <p className="flex items-center gap-2 text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <div className="flex gap-3">
        <ActionTooltip label="Refresh Group" side="top">
          <button
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            onClick={handleClick}
          >
            <RefreshCcw
              className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`}
            />
          </button>
        </ActionTooltip>
        <ActionTooltip label="Create Group" side="top">
          <button
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            onClick={() => onOpen("createGroup")}
          >
            <Plus className="w-4 h-4 " />
          </button>
        </ActionTooltip>
      </div>
    </div>
  );
};

export default ServerSection;
