import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/hooks/state/useConversation";
import useGroups, { type, useType } from "@/hooks/state/useGroups";
import Image from "next/image";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
  const { setSelectedConversation, selectedConversation } = useConversation();
  const { setSelectedGroup } = useGroups();
  const { setSelectedType } = useType();
  const isSelected = selectedConversation?.id === conversation.id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.id) || false;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2
				 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => {
          setSelectedConversation(conversation);
          setSelectedGroup(null);
          setSelectedType(type.Conversation);
        }}
      >
        <div>
          <div className="relative w-10 md:w-12 rounded-full">
            <Image
              src={conversation.profilePic}
              width={35}
              height={25}
              alt="user avatar"
              className="rounded-full"
            />
            <span
              className={`absolute top-0 right-2 h-2.5 w-2.5 rounded-full bg-green-600  ${!isOnline && "hidden"}`}
            ></span>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 text-sm md:text-md">
              {conversation.name}
            </p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};
export default Conversation;
