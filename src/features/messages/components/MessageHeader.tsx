/**
 * MessageHeader - Displays the header of a message conversation
 *
 * Shows company and job information for candidate's message view
 */

"use client";

import { Button } from "@/components/ui/button";
import { Users2, MoreVertical, Building2, Briefcase } from "lucide-react";
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
import Image from "next/image";
import { useState } from "react";

interface MessageHeaderProps {
  company: {
    name: string;
    logo: string;
  };
  job: {
    name: string;
    type?: string;
  };
  participants: Array<{
    name: string;
    role: string;
  }>;
}

export function MessageHeader({
  company,
  job,
  participants = [],
}: MessageHeaderProps) {
  const [imageError, setImageError] = useState(false);
  const recruiter = participants.find((p) => p.role === "Recruteur");

  return (
    <>
      <div className="flex items-start justify-between">
        {/* Left side - Company and Job info */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 shrink-0">
              {company.logo && !imageError ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-cover rounded-lg"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold truncate">{company.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <p className="text-sm truncate">{job.name}</p>
              </div>
            </div>
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
          {recruiter && (
            <p className="text-sm text-muted-foreground">
              En discussion avec {recruiter.name}
            </p>
          )}
        </div>

        {/* Right side - Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Archiver la conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
