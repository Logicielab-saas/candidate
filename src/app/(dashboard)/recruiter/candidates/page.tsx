import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CandidateFilters } from "@/features/recruiter/candidatures/components/CandidateFilters";
import { CandidateFiltersMenu } from "@/features/recruiter/candidatures/components/CandidateFiltersAnnonceMenu";
import { CandidateFilterTabs } from "@/features/recruiter/candidatures/components/CandidateFilterTabs";
import { CandidateDataTable } from "@/features/recruiter/candidatures/components/CandidateDataTable";
import { mockCandidates } from "@/core/mockData/candidates-data";

const CandidatesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <p className="text-2xl font-bold">Candidat(e)s</p>
        </div>
        <Button className="mt-2">Publier une annonce</Button>
      </div>
      <CandidateFiltersMenu />

      <Separator />

      <CandidateFilterTabs />

      <CandidateFilters />

      <div className="mt-2">
        <CandidateDataTable data={mockCandidates} />
      </div>
    </div>
  );
};

export default CandidatesPage;
