import { MessageType } from "@/hooks/state/useConversation";
import { extractTime } from "@/lib/helper";
import { useRef } from "react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";

const GroupMessage = ({
  message,
  session,
}: {
  message: MessageType;
  session: CustomSession;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fromMe = message?.senderId === session.user?.id;

  return (
    <div className="flex flex-col w-full my-2">
      <div ref={messagesEndRef} />
      <div
        className={`flex flex-col max-w-fit rounded-lg py-1 px-4 ${
          fromMe
            ? "bg-gradient-to-r from-blue-700 to-blue-800  text-white self-end"
            : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
        }`}
      >
        {message.body}
      </div>
      <span
        className={`opacity-50 text-xs flex gap-1 items-center text-white ${fromMe ? "self-end" : "self-start"}`}
      >
        {extractTime(message.createdAt)}
      </span>
    </div>
  );
};
export default GroupMessage;
