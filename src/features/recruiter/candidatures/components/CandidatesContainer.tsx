import { CandidateFiltersMenu } from "./CandidateFiltersAnnonceMenu";
import { CandidateFilterTabs } from "./CandidateFilterTabs";
import { CandidateFilters } from "./CandidateFilters";
import { CandidateDataTable } from "./CandidateDataTable";
import { mockCandidates } from "@/core/mockData/candidates-data";

export function CandidatesContainer() {
  return (
    <>
      <CandidateFiltersMenu />
      <CandidateFilterTabs />
      <CandidateFilters />
      <CandidateDataTable data={mockCandidates} />
    </>
  );
}
