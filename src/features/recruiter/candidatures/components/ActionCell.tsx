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
import {
  Ban,
  Calendar,
  Check,
  HelpCircle,
  MessageCircle,
  MoreVertical,
  Phone,
  X,
} from "lucide-react";
import { useState } from "react";
import { AppelerDialog } from "./AppelerDialog";
import { SupprimerDialog } from "./SupprimerDialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleDelete = () => {
    // Add delete logic here
    console.log("Deleting candidate:", candidate.nom);
    setIsAlertDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="h-10 w-10 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-0 rounded-l-sm rounded-r-none"
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Préselectionées</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Préselectionées</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="h-10 w-10 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-none"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">À décider</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>À décider</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="h-10 w-10 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-r-sm rounded-l-none"
            >
              <Ban className="h-4 w-4" />
              <span className="sr-only">Ecarter</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ecarter</p>
          </TooltipContent>
        </Tooltip>

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
                >
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                  <span>Contacter</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 transition-colors"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>Appeler</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-2.5 py-2.5 px-3 text-sm cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 transition-colors">
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

      <AppelerDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
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
    </div>
  );
}
