import { CandidatesContainer } from "@/features/recruiter/candidatures/components/CandidatesContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { PublierAnnonceLink } from "@/components/shared/PublierAnnonceLink";

const CandidatesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <p className="text-2xl font-bold">Candidat(e)s</p>
        </div>
        <PublierAnnonceLink />
      </div>
      <Suspense
        fallback={
          <div className="flex flex-col min-h-full gap-6">
            <Skeleton className="h-8 w-64" />
          </div>
        }
      >
        <CandidatesContainer />
      </Suspense>
    </div>
  );
};

export default CandidatesPage;
