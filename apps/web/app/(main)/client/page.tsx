import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import MessageContainer from "@/components/messages/MessageContainer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Client = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session?.user?.token) {
    return redirect("/");
  }

  return <MessageContainer session={session} />;
};

export default Client;
