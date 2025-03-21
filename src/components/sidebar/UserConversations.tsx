import Conversation from "./Conversation";

const UserConversations = ({
  conversations,
}: {
  conversations: ConversationType[];
}) => {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {!conversations ? (
        <>No Users</>
      ) : (
        conversations.length > 0 &&
        conversations?.map((conversation: ConversationType) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))
      )}
    </div>
  );
};
export default UserConversations;
