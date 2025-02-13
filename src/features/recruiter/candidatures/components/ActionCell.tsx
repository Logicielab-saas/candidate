"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MessageCircle, MoreVertical, Phone, X } from "lucide-react";
import { useState } from "react";
import { AppelerDialog } from "./AppelerDialog";
import { SupprimerDialog } from "./SupprimerDialog";
import { EntretienPlanDialog } from "./EntretienPlanDialog";
import { ContactInterfaceChat } from "./ContactInterfaceChat";
import { ActionButtons } from "./ActionButtons";

interface Candidate {
  nom: string;
  ville: string;
  profil: string;
  situation: string;
  datePostule: string;
  titreOffre: string;
  pertinence: string;
  telephone: string;
  activite: {
    status: string;
    message: string;
  };
}

export function ActionCell({ candidate }: { candidate: Candidate }) {
  const [isAppelerDialogOpen, setIsAppelerDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isEntretienPlanDialogOpen, setIsEntretienPlanDialogOpen] =
    useState(false);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);

  const handleDelete = () => {
    // Add delete logic here
    console.log("Deleting candidate:", candidate.nom);
    setIsAlertDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <ActionButtons />
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem
                  className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-zinc-100
                 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 transition-colors"
                  onClick={() => setIsChatDialogOpen(true)}
                >
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                  <span>Contacter</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 transition-colors"
                  onClick={() => setIsAppelerDialogOpen(true)}
                >
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>Appeler</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-zinc-100
                  dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 transition-colors"
                  onClick={() => setIsEntretienPlanDialogOpen(true)}
                >
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span>Planifier un Entretien</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 focus:bg-red-50 dark:focus:bg-red-950/50 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                  onClick={() => setIsAlertDialogOpen(true)}
                >
                  <X className="h-4 w-4" />
                  <span>Supprimer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>
            <p>Plus d&apos;actions</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <EntretienPlanDialog
        isOpen={isEntretienPlanDialogOpen}
        onOpenChange={setIsEntretienPlanDialogOpen}
        candidat={{
          nom: candidate.nom,
        }}
      />

      <AppelerDialog
        isOpen={isAppelerDialogOpen}
        onOpenChange={setIsAppelerDialogOpen}
        candidat={{
          nom: candidate.nom,
          telephone: candidate.telephone,
        }}
      />

      <SupprimerDialog
        isOpen={isAlertDialogOpen}
        onOpenChange={setIsAlertDialogOpen}
        candidat={{
          nom: candidate.nom,
        }}
        onConfirm={handleDelete}
      />

      <ContactInterfaceChat
        isOpen={isChatDialogOpen}
        onOpenChange={setIsChatDialogOpen}
        candidat={{
          nom: candidate.nom,
        }}
      />
    </div>
  );
}
