import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BackArrow } from "@/components/shared/BackArrow";
import { mockCandidates } from "@/app/(dashboard)/recruiter/candidates/page";
import { Candidate } from "./CandidateColumns";

export function CandidateDetails() {
  const candidate: Candidate[] = mockCandidates;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 flex items-center">
          <p className="text-2xl font-bold">Candidat(e)s</p>
          <Separator className="mx-2 h-10" orientation="vertical" />
          <Button variant="outline" className="bg-accent hover:bg-accent/50">
            Liste Des Candidats
          </Button>
        </div>
        <Button className="mt-2">Publier une annonce</Button>
      </div>
      <div className="mt-2">
        <BackArrow title="Retour" textSize="text-xl" />
      </div>
    </div>
  );
}
