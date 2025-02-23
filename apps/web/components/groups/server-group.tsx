"use client";
import { cn } from "@/lib/utils";
import { Edit, Group, Lock, Trash, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import ActionTooltip from "../action-tooltip";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { ModalType, useModal } from "@/hooks/state/useModalStore";
import useGroups, { GroupListData, MemberRole } from "@/hooks/state/useGroups";

const ServerGroups = ({
  group,
  session,
}: {
  group: GroupListData;
  session: CustomSession;
}) => {
  const router = useRouter();
  const { selectedGroup, setSelectedGroup } = useGroups();
  const { onOpen } = useModal();

  // const onClick = () => {
  //   router.push(`/groups/${group.id}`);
  // };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { group });
  };

  const role = group.groupMember.find(
    (member) => member.memberId === session?.user?.id
  )?.role;

  return (
    <div
      onClick={() => setSelectedGroup(group)}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-sky-500 transition mb-1 cursor-pointer",
        selectedGroup?.id === group.id && "bg-sky-500"
      )}
    >
      <Group size={18} />
      <div
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-blue-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          selectedGroup?.id === group.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {group.name}
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        {role !== MemberRole.GUEST && (
          <div className="ml-auto flex items-center gap-x-2">
            <ActionTooltip label="Edit">
              <Edit
                className="hidden group-hover:block w-4 h-4 text-zinc-200 hover:text-zinc-400 transition"
                // onClick={(e) => onAction(e, "editChannel")}
              />
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Trash
                className="hidden group-hover:block w-4 h-4 text-zinc-200 hover:text-zinc-400  transition"
                onClick={(e) => onAction(e, "deleteGroup")}
              />
            </ActionTooltip>
          </div>
        )}
        <ActionTooltip label="invite">
          <UserPlus
            className="group-hover:block w-4 h-4 text-zinc-200 hover:text-zinc-400  transition"
            onClick={() => onOpen("invite", { group })}
          />
        </ActionTooltip>
      </div>
      {group.name === selectedGroup?.id && (
        <Lock className="ml-auto w-4 h-4 text-zinc-200 dark:text-zinc-300" />
      )}
    </div>
  );
};

export default ServerGroups;
