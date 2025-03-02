import { Plus } from "lucide-react";
import { useSocketContext } from "@/context/SocketContext";
import useConversation, { MessageType } from "@/hooks/state/useConversation";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import useGroups, {
  GroupMessageType,
  Role,
  type,
  useType,
} from "@/hooks/state/useGroups";
import EmojiPicker from "../emoji-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useEffect } from "react";

const MessageInput = ({
  session,
  role,
}: {
  session: CustomSession;
  role: Role;
}) => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { groupMessage, setGroupMessage, selectedGroup } = useGroups();
  const { selectedType } = useType();

  const formSchema = z.object({
    content: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, selectedConversation]);

  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.content.trim()) return;

    if (selectedType === type.Group) {
      const payload: GroupMessageType = {
        id: uuidv4(),
        body: values.content,
        memberName: session?.user?.name || "user",
        senderId: session.user?.id || "",
        role: role,
        sender: {
          id: uuidv4(),
          name: session?.user?.name || "",
          email: session.user?.email || "",
          profilePic: session.user?.image || "",
        },
        groupId: selectedGroup?.id,
        createdAt: new Date().toISOString(),
      };
      socket?.emit("groupMessage", payload);
      setGroupMessage([...groupMessage, payload]);
    } else {
      const payload: MessageType = {
        id: uuidv4(),
        body: values.content,
        senderId: session.user?.id || "",
        receiverId: selectedConversation?.id,
        createdAt: new Date().toISOString(),
      };

      socket?.emit("message", payload);
      setMessages([...messages, payload]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    // onClick={() =>
                    //   onOpen("messageFile", {apiUrl,query})
                    // }
                    className="absolute top-7 left-8 h-[24px] w-[24px] dark:bg-gray-400 hover:bg-gray-600 dark:hover:bg-gray-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-blue-400 dark:bg-blue-700/20 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 dark:text-gray-300"
                    placeholder={`Message ${
                      selectedType === type.Group
                        ? "in " + selectedGroup?.name + " Group"
                        : "to " + selectedConversation?.name
                    }`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) => {
                        field.onChange(`${field.value}${emoji}`);
                      }}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default MessageInput;
