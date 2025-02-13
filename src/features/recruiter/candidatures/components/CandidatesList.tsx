import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockCandidates } from "@/app/(dashboard)/recruiter/candidates/page";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ContactInterfaceChat } from "./ContactInterfaceChat";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CandidatesListProps {
  currentCandidateId?: string;
}

export function CandidatesList({ currentCandidateId }: CandidatesListProps) {
  const [selectedChatCandidate, setSelectedChatCandidate] = useState<
    string | null
  >(null);
  const router = useRouter();

  const currentIndex = currentCandidateId
    ? mockCandidates.findIndex((c) => c.nom === currentCandidateId)
    : -1;

  const handleNavigation = (direction: "prev" | "next") => {
    if (currentIndex === -1) return;

    const newIndex =
      direction === "prev"
        ? Math.max(0, currentIndex - 1)
        : Math.min(mockCandidates.length - 1, currentIndex + 1);

    const candidate = mockCandidates[newIndex];
    if (candidate) {
      router.push(`/recruiter/candidates/details?id=${candidate.nom}`);
    }
  };

  return (
    <div className="w-[300px] border rounded-lg bg-background">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-muted-foreground">
            ({mockCandidates.length}) candidat(e)s
          </h2>
        </div>
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
            disabled={currentIndex === mockCandidates.length - 1}
            onClick={() => handleNavigation("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Adjustable height */}
      <ScrollArea className="h-[calc(100vh-25px)]">
        <div className="p-3">
          <div className="space-y-2">
            {mockCandidates.map((candidate) => (
              <div
                key={candidate.nom}
                className={`rounded-lg p-1 transition-colors ${
                  currentCandidateId === candidate.nom
                    ? "bg-accent border border-primaryHex-800"
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
                {candidate.activite.status === "Nouvelle candidature" && (
                  <div className="px-3 pb-3 space-y-1.5">
                    <Badge
                      variant="outline"
                      className={`w-fit border-emerald-200 ${
                        currentCandidateId === candidate.nom
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      Nouvelle candidature
                    </Badge>
                    <Button
                      variant="link"
                      className={`w-fit h-auto p-1 text-sm font-normal
                          "text-primaryHex-500 hover:text-primaryHex-500/90"
                      `}
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
