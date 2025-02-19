import useGetMessages from "@/hooks/useGetMessages";
import MessageSkeleton from "../uiSkeleton/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "@/hooks/useListenMessages";
import useChatScroll from "@/hooks/useChatScroll";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";

const Messages = ({ session }: { session: CustomSession }) => {
  const { loading, messages } = useGetMessages(session.user?.token || "");
  useListenMessages();

  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;

  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {loading && <MessageSkeleton />}

      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} session={session} />
        ))}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
