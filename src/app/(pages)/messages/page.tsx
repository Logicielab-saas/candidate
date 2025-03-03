import { Skeleton } from "@/components/ui/skeleton";
import { MessagesContainer } from "@/features/messages/components/MessagesContainer";
import { Suspense } from "react";

const MessagesPage = () => {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 ">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-6">
            {/* Messages List Skeleton */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            </div>

            {/* Message Content Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <div className="space-y-2">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <MessagesContainer />
    </Suspense>
  );
};

export default MessagesPage;
