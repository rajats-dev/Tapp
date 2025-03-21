import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { GROUP_URL } from "@/lib/apiAuthRoutes";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  inviteCode: string;
}

const InviteCodePage = async ({
  params,
}: {
  params: Promise<InviteCodePageProps>;
}) => {
  const { inviteCode } = await params;
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }
  if (!inviteCode) {
    return redirect("/");
  }

  const res = await axios.post(
    `${GROUP_URL}/joinGroup`,
    { inviteCode: inviteCode },
    {
      headers: {
        Authorization: session?.user?.token,
      },
    }
  );

  if (res.status == 200) {
    console.log("Your joined group successfully!");
  }

  return redirect("/client");
};
export default InviteCodePage;
