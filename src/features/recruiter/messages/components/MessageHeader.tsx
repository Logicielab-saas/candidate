"use client";

import { Button } from "@/components/ui/button";
import { Phone, Calendar, User, Users2, MoreVertical } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppelerDialog } from "../../../../components/shared/AppelerDialog";
import { EntretienPlanDialog } from "../../../../components/shared/EntretienPlanDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Participant {
  name: string;
  role: string;
}

interface MessageHeaderProps {
  candidate: {
    name: string;
    position: string;
    city: string;
    telephone?: string;
  };
  jobTitle: string;
  participants?: Participant[];
}

const DEFAULT_PARTICIPANTS: Participant[] = [
  { name: "Meryem AZELMAD", role: "Candidat" },
  { name: "Recruteur", role: "Vous" },
];

export function MessageHeader({
  candidate,
  jobTitle,
  participants = DEFAULT_PARTICIPANTS,
}: MessageHeaderProps) {
  const router = useRouter();
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isEntretienDialogOpen, setIsEntretienDialogOpen] = useState(false);

  const handlePhoneClick = () => {
    setIsPhoneDialogOpen(true);
  };

  const handleScheduleClick = () => {
    setIsEntretienDialogOpen(true);
  };

  const handleDetailsClick = () => {
    router.push(
      `/recruiter/candidates/details?id=${candidate.name}&source=messagerie`
    );
  };

  return (
    <>
      <div className="flex items-start justify-between">
        {/* Left side - Candidate info */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{candidate.name}</h2>
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <span>•</span>
                    <Users2 className="h-4 w-4" />
                    <span>{participants.length} personnes</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="p-2">
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium">Participants</p>
                    {participants.map((participant, index) => (
                      <div key={index} className="flex flex-col gap-0.5">
                        <span className="text-sm">{participant.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {participant.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-muted-foreground">
            A postulé pour {jobTitle} ({candidate.city})
          </p>
        </div>

        {/* Right side - Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handlePhoneClick} className="gap-2">
              <Phone className="h-4 w-4" />
              <span>Afficher téléphone</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleScheduleClick} className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Planifier entretien</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDetailsClick} className="gap-2">
              <User className="h-4 w-4" />
              <span>Détails candidat</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AppelerDialog
        isOpen={isPhoneDialogOpen}
        onOpenChange={setIsPhoneDialogOpen}
        candidat={{
          nom: candidate.name,
          telephone: candidate.telephone || "+212 6XX-XXXXXX",
        }}
      />

      <EntretienPlanDialog
        isOpen={isEntretienDialogOpen}
        onOpenChange={setIsEntretienDialogOpen}
        candidat={{
          nom: candidate.name,
        }}
      />
    </>
  );
}
