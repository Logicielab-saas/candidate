import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockCandidates } from "@/app/(dashboard)/recruiter/candidates/page";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { ContactInterfaceChat } from "./ContactInterfaceChat";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CandidatesListProps {
  currentCandidateId?: string;
  source?: "entretien";
  candidateName?: string;
}

export function CandidatesList({
  currentCandidateId,
  source,
  candidateName,
}: CandidatesListProps) {
  const [selectedChatCandidate, setSelectedChatCandidate] = useState<
    string | null
  >(null);
  const router = useRouter();

  // Filter candidates based on source
  const filteredCandidates = useMemo(() => {
    if (source === "entretien" && candidateName) {
      return mockCandidates.filter((c) => c.nom === candidateName);
    }
    return mockCandidates;
  }, [source, candidateName]);

  const currentIndex = currentCandidateId
    ? filteredCandidates.findIndex((c) => c.nom === currentCandidateId)
    : -1;

  const handleNavigation = (direction: "prev" | "next") => {
    if (currentIndex === -1) return;

    const newIndex =
      direction === "prev"
        ? Math.max(0, currentIndex - 1)
        : Math.min(filteredCandidates.length - 1, currentIndex + 1);

    const candidate = filteredCandidates[newIndex];
    if (candidate) {
      router.push(`/recruiter/candidates/details?id=${candidate.nom}`);
    }
  };

  return (
    <div className="w-[300px] [@media(max-width:1170px)]:w-full border border-border rounded-lg bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-muted-foreground">
            {source === "entretien"
              ? "Candidature"
              : `(${filteredCandidates.length}) candidat(e)s`}
          </h2>
        </div>
        {!source && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-accent"
              disabled={currentIndex <= 0}
              onClick={() => handleNavigation("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-accent"
              disabled={currentIndex === filteredCandidates.length - 1}
              onClick={() => handleNavigation("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      {/* Adjustable height */}
      <ScrollArea
        className={cn(
          "h-[calc(100vh-300px)]",
          source === "entretien" && "h-[calc(100vh-400px)]"
        )}
      >
        <div className="p-3">
          <div className="space-y-2">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.nom}
                className={`rounded-lg p-1 transition-colors ${
                  currentCandidateId === candidate.nom
                    ? "bg-accent border border-border"
                    : "hover:bg-accent/50"
                }`}
              >
                <Link
                  href={`/recruiter/candidates/details?id=${candidate.nom}`}
                >
                  <div className="p-3">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`font-medium ${
                          currentCandidateId === candidate.nom
                            ? "text-accent-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {candidate.nom}
                      </span>
                      <div
                        className={`flex flex-col gap-0.5 text-sm ${
                          currentCandidateId === candidate.nom
                            ? "text-accent-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                          <span>{candidate.profil}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                          <span>{candidate.ville}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                {candidate.activite.status === "Nouvelle candidature" &&
                  !source && (
                    <div className="px-3 pb-3 space-y-1.5">
                      <Badge
                        variant="outline"
                        className={`w-fit ${
                          currentCandidateId === candidate.nom
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                            : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                        }`}
                      >
                        Nouvelle candidature
                      </Badge>
                      <Button
                        variant="link"
                        className={`w-fit h-auto p-1 text-sm font-normal text-primaryHex-500 dark:text-primaryHex-400 hover:text-primaryHex-600 dark:hover:text-primaryHex-300`}
                        onClick={() => setSelectedChatCandidate(candidate.nom)}
                      >
                        Envoyer un message
                      </Button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      <ContactInterfaceChat
        isOpen={!!selectedChatCandidate}
        onOpenChange={(open) => !open && setSelectedChatCandidate(null)}
        candidat={{
          nom: selectedChatCandidate || "",
        }}
      />
    </div>
  );
}
