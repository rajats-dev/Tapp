import { extractTime } from "@/lib/helper";
import { useRef } from "react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { GroupMessageType } from "@/hooks/state/useGroups";

const GroupMessage = ({
  message,
  session,
}: {
  message: GroupMessageType;
  session: CustomSession;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fromMe = message?.senderId === session.user?.id;

  return (
    <div className="flex flex-col w-full my-2">
      <div ref={messagesEndRef} />

      <div
        className={`flex h-auto flex-col self-start rounded-lg px-2 py-1 shadow-sm ${
          fromMe
            ? "bg-gradient-to-r from-blue-700 to-blue-800  text-white self-end"
            : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
        }`}
      >
        <p className="max-w-20 truncate text-xs pl-0 opacity-65">
          {message.memberName}
        </p>
        <p className="text-wrap text-lg max-w-56">{message.body}</p>
        <div className="flex justify-end gap-2 -mt-1">
          <span
            className={`opacity-50 text-xs flex gap-1 items-center ${fromMe ? "self-end" : "self-start"}`}
          >
            {extractTime(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default GroupMessage;
