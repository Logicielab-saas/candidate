import { Suspense } from "react";
import EntretiensContainer from "@/features/recruiter/interviews/components/EntretiensContainer";
import { Skeleton } from "@/components/ui/skeleton";

// todo: add a loading state Skeleton
const InterviewsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      }
    >
      <EntretiensContainer />
    </Suspense>
  );
};

export default InterviewsPage;
