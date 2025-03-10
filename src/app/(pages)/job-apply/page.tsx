import { JobApplyContainer } from "@/features/job-apply/components/JobApplyContainer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-8 max-w-7xl">
          <div className="mb-8">
            <Skeleton className="h-12 w-96 mx-auto mb-2" />
            <Skeleton className="h-6 w-[500px] mx-auto" />
          </div>

          {/* Step indicator skeleton */}
          <div className="flex justify-between items-center max-w-2xl mx-auto mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-1 w-16 ml-2" />
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <Skeleton className="h-[600px] w-full" />
            </div>
            <div className="lg:col-span-5">
              <Skeleton className="h-[600px] w-full" />
            </div>
          </div>
        </div>
      }
    >
      <JobApplyContainer />
    </Suspense>
  );
}
