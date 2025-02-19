import { Separator } from "../ui/separator";
import { ModeToggle } from "../mode-toggle";
import NavigationAction from "./navigation.action";
import ProfileMenu from "@/features/auth/components/profile-menu";
import { getServerSession } from "next-auth";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";

const NavigationSidebar = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#121a2763] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-2px bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <div className="flex-1 w-full"></div>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <ProfileMenu
          name={session?.user?.name || ""}
          image={session?.user?.image || ""}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
