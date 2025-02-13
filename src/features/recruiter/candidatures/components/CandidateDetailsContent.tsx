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
} from "lucide-react";
import { mockCandidates } from "@/app/(dashboard)/recruiter/candidates/page";
import { useState } from "react";
import { AppelerDialog } from "./AppelerDialog";
import { EntretienPlanDialog } from "./EntretienPlanDialog";
import { ContactInterfaceChat } from "./ContactInterfaceChat";
import { TooltipProvider } from "@/components/ui/tooltip";

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

  const candidate = mockCandidates.find((c) => c.nom === candidateId);

  if (!candidate) return null;

  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* Top Half - Candidate Info */}
      <div className="p-6 bg-background rounded-lg border">
        {/* Header with name and actions */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">{candidate.nom}</h1>
          <div className="flex items-center">
            <TooltipProvider>
              <ActionButtons />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem
                    className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => setIsChatDialogOpen(true)}
                  >
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                    <span>Contacter</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => setIsAppelerDialogOpen(true)}
                  >
                    <Phone className="h-4 w-4 text-green-600" />
                    <span>Appeler</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => setIsEntretienPlanDialogOpen(true)}
                  >
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span>Planifier un Entretien</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>
          </div>
        </div>

        {/* Profile and Location */}
        <div className="space-y-1 mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-current opacity-40" />
            <span>{candidate.profil}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-current opacity-40" />
            <span>{candidate.ville}</span>
          </div>
        </div>

        {/* Job Application Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">A postulé pour</h2>
          <div className="p-4 rounded-lg border bg-muted/40">
            <div className="flex flex-col gap-1">
              <span className="font-medium">{candidate.titreOffre}</span>
              <span className="text-sm text-muted-foreground">
                {candidate.ville}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsChatDialogOpen(true)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Contacter
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsAppelerDialogOpen(true)}
          >
            <Phone className="h-4 w-4 mr-2" />
            Appeler
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsEntretienPlanDialogOpen(true)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Entretien
          </Button>
        </div>

        {/* Questions Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Questions de présélection personnalisées
          </h2>
          <div className="text-sm text-muted-foreground">
            Aucune Q/R n&apos;a été et ne pourra être configurée pour cette
            offre d&apos;emploi car aucun questionnaire n&apos;a été
            sélectionné.
          </div>
        </div>
      </div>

      {/* Bottom Half - CV Section */}
      <div className="p-6 bg-background rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">CV</h2>
          <Button
            variant="outline"
            size="sm"
            className="text-primaryHex-600 border-primaryHex-200 hover:bg-primaryHex-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Télécharger au format PDF
          </Button>
        </div>
        <div className="p-4 rounded-lg border bg-muted/40">
          {/* CV content placeholder - you can add actual CV content here */}
          <div className="text-sm text-muted-foreground">
            CV content will be displayed here
          </div>
        </div>
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
    </div>
  );
}
