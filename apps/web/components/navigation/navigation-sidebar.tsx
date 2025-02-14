import { Separator } from "../ui/separator";
import { ModeToggle } from "../mode-toggle";
import NavigationAction from "./navigation.action";

const NavigationSidebar = async () => {
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#121a2763] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-2px bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <div className="flex-1 w-full"></div>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavigationSidebar;
