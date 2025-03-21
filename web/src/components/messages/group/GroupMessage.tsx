import { extractTime } from "@/lib/helper";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { GroupMessageType, MemberRole, Role } from "@/hooks/state/useGroups";
import ActionTooltip from "@/components/action-tooltip";
import { ShieldAlert, Trash } from "lucide-react";
import UserAvatar from "@/common/UserAvatar";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/state/useModalStore";

const roleIconMap = {
  GUEST: null,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const GroupMessage = ({
  message,
  session,
  currentRole,
}: {
  currentRole: Role;
  message: GroupMessageType;
  session: CustomSession;
}) => {
  const { onOpen } = useModal();
  const isAdmin = currentRole === MemberRole[0];
  const isOwner = session?.user?.id === message?.senderId;
  const role: Role | undefined = message?.role;
  const canDeleteMessage = isAdmin || isOwner;

  return (
    <div className="relative group flex items-center hover:bg-black/10 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar
            name={message?.sender?.name || ""}
            image={message?.sender?.profilePic}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm">{message.memberName}</p>

              <ActionTooltip label={`${message?.role}`}>
                {role && roleIconMap[role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {extractTime(message.createdAt)}
            </span>
          </div>
          <p className={cn("text-sm text-zinc-600 dark:text-zinc-300")}>
            {message.body}
          </p>
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dar:bg-zinc-800 border rounded-sm">
          <ActionTooltip label="Delete">
            <Trash
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300  transition"
              onClick={() =>
                onOpen("deleteMessage", {
                  messageId: message.id,
                })
              }
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};
export default GroupMessage;
