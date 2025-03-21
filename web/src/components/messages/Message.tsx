import { MessageType } from "@/hooks/state/useConversation";
import { extractTime } from "@/lib/helper";
import UserAvatar from "@/common/UserAvatar";

const Message = ({ message }: { message: MessageType }) => {
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
              <p className="font-semibold text-sm">{message?.sender?.name}</p>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {extractTime(message.createdAt)}
            </span>
          </div>
          <p className={"text-sm text-zinc-600 dark:text-zinc-300"}>
            {message.body}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Message;
