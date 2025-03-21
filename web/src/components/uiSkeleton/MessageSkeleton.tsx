import { Skeleton } from "../ui/skeleton";

const MessageSkeleton = () => {
  return (
    <>
      <div className="flex flex-col h-full items-center justify-center gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[550px]" />
              <Skeleton className="h-4 w-[500px]" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MessageSkeleton;
