import { cn } from "@/lib/utils";
import { HomeHeader } from "@/features/Home/components/HomeHeader";
import { JobsContainer } from "@/features/Home/components/JobsContainer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className={cn("bg-background", "min-h-screen")}>
      <div className={cn("mx-auto max-w-7xl", "px-4 sm:px-6 lg:px-8 pt-10")}>
        {/* Header Section */}
        <div className="text-center space-y-3 mb-6">
          <h1
            className={cn(
              "text-4xl md:text-5xl font-bold",
              "tracking-tight",
              "bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text",
              "animate-in fade-in duration-1000"
            )}
          >
            Discover Your Dream Career
          </h1>
          <p
            className={cn(
              "text-lg text-muted-foreground",
              "max-w-2xl mx-auto",
              "animate-in fade-in duration-1000 delay-200"
            )}
          >
            Explore thousands of job opportunities and find the perfect role
            that matches your skills and aspirations
          </p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-end justify-center">
                <Skeleton className="h-10 w-[500px]" />
                <Skeleton className="h-10 w-[200px]" />
                <Skeleton className="h-10 w-[120px]" />
              </div>
            </div>
          }
        >
          <HomeHeader />
        </Suspense>

        <Suspense
          fallback={
            <div className="space-y-6 mt-5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-40" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-40 w-full" />
                <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                  <div className="space-y-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <JobsContainer />
        </Suspense>
      </div>
    </div>
  );
}
