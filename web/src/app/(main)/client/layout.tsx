import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import Sidebar from "@/components/sidebar/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session?.user?.token) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="max-md:hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <Sidebar session={session} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default MainLayout;
