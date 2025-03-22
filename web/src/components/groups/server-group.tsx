"use client";
import { cn } from "@/lib/utils";
import { Group, Lock, Trash, UserPlus } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { ModalType, useModal } from "@/hooks/state/useModalStore";
import useGroups, {
  GroupListData,
  MemberRole,
  Role,
  type,
  useType,
} from "@/hooks/state/useGroups";
import useConversation from "@/hooks/state/useConversation";

const ServerGroups = ({
  group,
  session,
}: {
  group: GroupListData;
  session: CustomSession;
}) => {
  const { selectedGroup, setSelectedGroup } = useGroups();
  const { setSelectedConversation } = useConversation();
  const { onOpen } = useModal();
  const { setSelectedType } = useType();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { group });
  };

  const role: Role | undefined = group?.groupMember?.find(
    (member) => member.memberId === session?.user?.id
  )?.role;

  return (
    <div
      onClick={() => {
        setSelectedGroup(group);
        setSelectedConversation(null);
        setSelectedType(type.Group);
      }}
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
        {role !== MemberRole[1] && (
          <div className="ml-auto flex items-center gap-x-2">
            <ActionTooltip label="Delete">
              <Trash
                className="hidden group-hover:block w-4 h-4 text-zinc-200 hover:text-zinc-400  transition"
                onClick={(e) => onAction(e, "deleteGroup")}
              />
            </ActionTooltip>
          </div>
        )}
        {role !== MemberRole[1] && (
          <ActionTooltip label="invite">
            <UserPlus
              className="group-hover:block w-4 h-4 text-zinc-200 hover:text-zinc-400  transition"
              onClick={(e) => {
                e.stopPropagation();
                onOpen("invite", { group });
              }}
            />
          </ActionTooltip>
        )}
      </div>
      {role === MemberRole[1] && (
        <Lock className="ml-auto w-4 h-4 text-zinc-200 dark:text-zinc-300" />
      )}
    </div>
  );
};

export default ServerGroups;
