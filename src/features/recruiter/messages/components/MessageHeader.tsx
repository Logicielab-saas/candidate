"use client";

import { Button } from "@/components/ui/button";
import { Phone, Calendar, User, Users2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppelerDialog } from "../../candidatures/components/AppelerDialog";
import { EntretienPlanDialog } from "../../candidatures/components/EntretienPlanDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePhoneClick}>
            <Phone className="h-4 w-4 mr-2" />
            Afficher téléphone
          </Button>
          <Button variant="outline" size="sm" onClick={handleScheduleClick}>
            <Calendar className="h-4 w-4 mr-2" />
            Planifier entretien
          </Button>
          <Button variant="outline" size="sm" onClick={handleDetailsClick}>
            <User className="h-4 w-4 mr-2" />
            Détails candidat
          </Button>
        </div>
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
