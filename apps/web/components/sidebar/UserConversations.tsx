/* eslint-disable @typescript-eslint/no-explicit-any */
import Conversation from "./Conversation";

const UserConversations = ({ conversations }: { conversations: any }) => {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.length > 0 &&
        conversations?.map((conversation: any) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))}
      {!conversations ? (
        <span className="loading loading-spinner mx-auto" />
      ) : null}
    </div>
  );
};
export default UserConversations;
