import MessageSkeleton from "../../uiSkeleton/MessageSkeleton";
import useListenMessages from "@/hooks/query/useListenMessages";
import useChatScroll from "@/hooks/query/useChatScroll";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import useGroupMessages from "@/hooks/query/useGroupMessages";
import GroupMessage from "./GroupMessage";
import { Role } from "@/hooks/state/useGroups";

const GroupMessages = ({
  session,
  role,
}: {
  session: CustomSession;
  role: Role;
}) => {
  const { loading, groupMessage } = useGroupMessages(session.user?.token || "");
  useListenMessages();

  const ref = useChatScroll(
    groupMessage
  ) as React.MutableRefObject<HTMLDivElement>;

  return (
    <div className="px-4 flex-1  flex flex-col  overflow-auto" ref={ref}>
      {loading && <MessageSkeleton />}
      <div className="flex-1"></div>

      {!loading &&
        groupMessage.map((message) => (
          <GroupMessage
            key={message.id}
            currentRole={role}
            message={message}
            session={session}
          />
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
