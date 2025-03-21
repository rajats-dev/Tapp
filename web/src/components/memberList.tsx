/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Users } from "lucide-react";

export function MemberList({ list }: { list: any }) {
  const length = list?.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm">
          <Users />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-4">
          {list?.map((item: any, idx: number) => (
            <div key={idx} className="grid gap-2">
              <div className="flex items-center gap-3">
                <Image
                  src={item?.member.profilePic}
                  width={35}
                  height={35}
                  alt="image"
                  className="rounded-full"
                />
                <p>{item.memberName}</p>
              </div>
              {idx !== length - 1 && <Separator className="w-48 h-[1px]" />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
