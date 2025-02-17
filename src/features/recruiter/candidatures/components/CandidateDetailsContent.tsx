import { Button } from "@/components/ui/button";
import { ActionButtons } from "./ActionButtons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Download,
  MessageCircle,
  MoreVertical,
  Phone,
  StickyNote,
  Trash2,
} from "lucide-react";
import { mockCandidates } from "@/app/(dashboard)/recruiter/candidates/page";
import { useState } from "react";
import { AppelerDialog } from "../../../../components/shared/AppelerDialog";
import { EntretienPlanDialog } from "../../../../components/shared/EntretienPlanDialog";
import { ContactInterfaceChat } from "./ContactInterfaceChat";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NotesDialog } from "./NotesDialog";
import { handleDownloadCV } from "@/core/utils/download-cv";
import { SupprimerDialog } from "./SupprimerDialog";

// TODO: make this scrollable at fixed height when not source presented in page details

interface QuestionAnswer {
  id: number;
  question: string;
  answer: string;
  timestamp: string;
}

const MOCK_QUESTIONS: QuestionAnswer[] = [
  {
    id: 1,
    question: "Êtes-vous disponible pour entretien dans les prochains jours ?",
    answer:
      "Oui, je suis disponible tous les jours de la semaine prochaine, de préférence en matinée.",
    timestamp: "2024-03-20T10:30:00Z",
  },
  {
    id: 2,
    question: "Quel est votre niveau d'anglais ?",
    answer:
      "Je possède un niveau C1 en anglais, certifié par le TOEIC (score: 945). Je pratique régulièrement l'anglais dans un contexte professionnel.",
    timestamp: "2024-03-20T10:31:00Z",
  },
  {
    id: 3,
    question: "Quelle est votre prétention salariale ?",
    answer:
      "Ma prétention salariale se situe entre 45K€ et 50K€ brut annuel, selon les avantages proposés.",
    timestamp: "2024-03-20T10:32:00Z",
  },
  {
    id: 4,
    question: "Quelle est votre prétention salariale ?",
    answer:
      "Ma prétention salariale se situe entre 45K€ et 50K€ brut annuel, selon les avantages proposés.",
    timestamp: "2024-03-20T10:32:00Z",
  },
  {
    id: 5,
    question: "Quelle est votre prétention salariale ?",
    answer:
      "Ma prétention salariale se situe entre 45K€ et 50K€ brut annuel, selon les avantages proposés.",
    timestamp: "2024-03-20T10:32:00Z",
  },
];

interface CandidateDetailsContentProps {
  candidateId?: string;
}

export function CandidateDetailsContent({
  candidateId,
}: CandidateDetailsContentProps) {
  const [isAppelerDialogOpen, setIsAppelerDialogOpen] = useState(false);
  const [isEntretienPlanDialogOpen, setIsEntretienPlanDialogOpen] =
    useState(false);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [isSupprimerDialogOpen, setIsSupprimerDialogOpen] = useState(false);

  const candidate = mockCandidates.find((c) => c.nom === candidateId);

  if (!candidate) return null;

  const handleDeleteCandidate = () => {
    console.log("delete candidate");
  };

  return (
    <div className="p-6 bg-background rounded-lg border border-border">
      {/* Header with name and actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-foreground">
              {candidate.nom}
            </h1>
          </div>
        </div>
        <div className="flex items-center">
          <TooltipProvider>
            <ActionButtons />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[200px] mt-2">
                <DropdownMenuItem
                  className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-accent"
                  onClick={() => handleDownloadCV("/cvs/mycv.pdf")}
                >
                  <Download className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                  <span>Télécharger le CV</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-accent text-red-500 dark:text-red-400"
                  onClick={() => setIsSupprimerDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="">Supprimer candidat(e)</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        </div>
      </div>

      {/* Profile and Location */}
      <div className="space-y-1 mb-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-bold">{candidate.profil}</span>
          <span className="h-1 w-1 rounded-full bg-current opacity-40" />
          <span>{candidate.ville}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground"></div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>
            A postulé pour{" "}
            <span className="font-bold">
              {candidate.titreOffre} • {candidate.ville}
            </span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="@container">
        <div className="grid grid-cols-2 @[380px]:grid-cols-4 gap-3 mb-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsChatDialogOpen(true)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Contacter
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsAppelerDialogOpen(true)}
          >
            <Phone className="h-4 w-4 mr-2" />
            Appeler
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsEntretienPlanDialogOpen(true)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Entretien
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsNotesDialogOpen(true)}
          >
            <StickyNote className="h-4 w-4 mr-2" />
            Note
          </Button>
        </div>
      </div>

      {/* Questions Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Questions de présélection personnalisées
        </h2>
        {MOCK_QUESTIONS.length > 0 ? (
          <div className="space-y-4">
            {MOCK_QUESTIONS.map((qa) => (
              <div
                key={qa.id}
                className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{qa.question}</p>
                    <time className="text-sm text-muted-foreground">
                      {new Date(qa.timestamp).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">{qa.answer}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            Aucune Q/R n&apos;a été et ne pourra être configurée pour cette
            offre d&apos;emploi car aucun questionnaire n&apos;a été
            sélectionné.
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AppelerDialog
        isOpen={isAppelerDialogOpen}
        onOpenChange={setIsAppelerDialogOpen}
        candidat={{
          nom: candidate.nom,
          telephone: candidate.telephone,
        }}
      />
      <EntretienPlanDialog
        isOpen={isEntretienPlanDialogOpen}
        onOpenChange={setIsEntretienPlanDialogOpen}
        candidat={{
          nom: candidate.nom,
        }}
      />
      <ContactInterfaceChat
        isOpen={isChatDialogOpen}
        onOpenChange={(open) => !open && setIsChatDialogOpen(false)}
        candidat={{
          nom: candidate.nom,
        }}
      />
      <NotesDialog
        isOpen={isNotesDialogOpen}
        onOpenChange={setIsNotesDialogOpen}
        candidateNom={candidate.nom}
      />
      <SupprimerDialog
        isOpen={isSupprimerDialogOpen}
        onOpenChange={setIsSupprimerDialogOpen}
        candidat={{
          nom: candidate.nom,
        }}
        onConfirm={handleDeleteCandidate}
      />
    </div>
  );
}
