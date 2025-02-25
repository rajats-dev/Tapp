import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { GROUP_URL } from "@/lib/apiAuthRoutes";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }
  if (!params.inviteCode) {
    return redirect("/");
  }

  const res = await axios.post(
    `${GROUP_URL}/joinGroup`,
    { inviteCode: params?.inviteCode },
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
