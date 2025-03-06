"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Bookmark, XCircle, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ReportJobDialog } from "@/features/candidature/(profile)/components/my-jobs/ReportJobDialog";
import { NotInterestedDialog } from "./NotInterestedDialog";

interface JobCardMenuProps {
  jobId: string;
  onNotInterested?: (jobId: string) => void;
}

export function JobCardMenu({ jobId, onNotInterested }: JobCardMenuProps) {
  const [isSignalerOpen, setIsSignalerOpen] = useState(false);
  const [isNotInterestedOpen, setIsNotInterestedOpen] = useState(false);

  const handleNotInterested = (id: string) => {
    onNotInterested?.(id);
    setIsNotInterestedOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", "-mr-2")}
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Bookmark className="h-4 w-4" />
            <span>Bookmark l&apos;offre</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer text-yellow-600"
            onClick={() => setIsNotInterestedOpen(true)}
          >
            <XCircle className="h-4 w-4" />
            <span>Pas intéressé(e)</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer text-destructive"
            onClick={() => setIsSignalerOpen(true)}
          >
            <Flag className="h-4 w-4" />
            <span>Signaler cette offre</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <NotInterestedDialog
        open={isNotInterestedOpen}
        onOpenChange={setIsNotInterestedOpen}
        jobId={jobId}
        onConfirm={handleNotInterested}
      />

      <ReportJobDialog
        open={isSignalerOpen}
        onOpenChange={setIsSignalerOpen}
        jobId={jobId}
      />
    </>
  );
}
