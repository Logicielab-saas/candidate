import { CandidateDetails } from "@/features/recruiter/candidatures/components/CandidateDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const CandidateDetailsPage = () => {
  return (
    <div className="h-full overflow-hidden">
      <Suspense
        fallback={
          <div className="flex flex-col min-h-full gap-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-8 w-64" />
            </div>
            <div className="grid grid-cols-1 [@media(min-width:1170px)]:grid-cols-[300px_1fr] [@media(min-width:1635px)]:grid-cols-[300px_1fr_400px] gap-4">
              <Skeleton className="h-[calc(100vh-200px)]" />
              <Skeleton className="h-[calc(100vh-200px)]" />
              <Skeleton className="h-[calc(100vh-200px)]" />
            </div>
          </div>
        }
      >
        <CandidateDetails />
      </Suspense>
    </div>
  );
};

export default CandidateDetailsPage;
