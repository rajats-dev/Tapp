import MessageSkeleton from "../../uiSkeleton/MessageSkeleton";
import useListenMessages from "@/hooks/query/useListenMessages";
import useChatScroll from "@/hooks/query/useChatScroll";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import useGroupMessages from "@/hooks/query/useGroupMessages";
import GroupMessage from "./GroupMessage";

const GroupMessages = ({ session }: { session: CustomSession }) => {
  const { loading, groupMessage } = useGroupMessages(session.user?.token || "");
  useListenMessages();

  console.log(groupMessage);

  const ref = useChatScroll(
    groupMessage
  ) as React.MutableRefObject<HTMLDivElement>;

  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {loading && <MessageSkeleton />}

      {!loading &&
        groupMessage.map((message) => (
          <GroupMessage key={message.id} message={message} session={session} />
        ))}

      {!loading && groupMessage.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default GroupMessages;
