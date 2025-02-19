import AuthScreen from "@/features/auth/components/auth-screen";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return <>{!session?.user && <AuthScreen />}</>;
}
