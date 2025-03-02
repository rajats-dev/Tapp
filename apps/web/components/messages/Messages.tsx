import useGetMessages from "@/hooks/query/useGetMessages";
import MessageSkeleton from "../uiSkeleton/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "@/hooks/query/useListenMessages";
import useChatScroll from "@/hooks/query/useChatScroll";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";

const Messages = ({ session }: { session: CustomSession }) => {
  const { loading, messages } = useGetMessages(session.user?.token || "");
  useListenMessages();

  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;

  return (
    <div className="px-4 flex-1 flex flex-col overflow-auto" ref={ref}>
      {loading && <MessageSkeleton />}
      <div className="flex-1"></div>

      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {!loading && messages.length === 0 && (
        <div className="border-[1px] mb-20 border-white mx-auto p-10 font-bold bg-blue-500/10 text-center text-white h-20 rounded-xl flex justify-center items-center">
          Send a message to start the conversation
        </div>
      )}
    </div>
  );
};
export default Messages;
