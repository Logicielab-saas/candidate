"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Heart, XCircle, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ReportJobDialog } from "@/features/candidature/(profile)/my-jobs/ReportJobDialog";
import { NotInterestedDialog } from "./NotInterestedDialog";
import { useSavedJobsStore } from "../store/saved-jobs.store";
import { useSaveEmplois, useCancelSaveEmplois } from "../hooks/use-emplois";
import { useQueryClient } from "@tanstack/react-query";
import { EMPLOIS_QUERY_KEY } from "../hooks/use-emplois";

interface JobCardMenuProps {
  jobId: string;
  onNotInterested?: (jobId: string) => void;
}

export function JobCardMenu({ jobId, onNotInterested }: JobCardMenuProps) {
  const [isSignalerOpen, setIsSignalerOpen] = useState(false);
  const [isNotInterestedOpen, setIsNotInterestedOpen] = useState(false);
  const queryClient = useQueryClient();

  // Global state for saved jobs
  const { isSaved, saveJob, removeSavedJob } = useSavedJobsStore();
  const isBookmarked = isSaved(jobId);

  // Save/Cancel save job mutations
  const { mutate: saveEmplois, isPending: isSaving } = useSaveEmplois();
  const { mutate: cancelSaveEmplois, isPending: isCanceling } =
    useCancelSaveEmplois();

  const handleNotInterested = (id: string) => {
    onNotInterested?.(id);
    setIsNotInterestedOpen(false);
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isBookmarked) {
      // Remove from favorites and revalidate together
      await Promise.all([
        new Promise((resolve) => {
          cancelSaveEmplois(jobId, {
            onSuccess: () => {
              removeSavedJob(jobId);
              resolve(true);
            },
          });
        }),
        queryClient.invalidateQueries({ queryKey: EMPLOIS_QUERY_KEY }),
      ]);
    } else {
      // Add to favorites and revalidate together
      await Promise.all([
        new Promise((resolve) => {
          saveEmplois(jobId, {
            onSuccess: () => {
              saveJob(jobId);
              resolve(true);
            },
          });
        }),
        queryClient.invalidateQueries({ queryKey: EMPLOIS_QUERY_KEY }),
      ]);
    }
  };

  const handleNotInterestedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNotInterestedOpen(true);
  };

  const handleSignalerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSignalerOpen(true);
  };

  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Check if any bookmark action is in progress
  const isLoading = isSaving || isCanceling;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", "-mr-2")}
            disabled={isLoading}
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleBookmarkClick}
            disabled={isLoading}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isBookmarked && "fill-primaryHex-500 text-primaryHex-500"
              )}
            />
            <span>
              {isBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer text-yellow-600"
            onClick={handleNotInterestedClick}
          >
            <XCircle className="h-4 w-4" />
            <span>Pas intéressé(e)</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer text-destructive"
            onClick={handleSignalerClick}
          >
            <Flag className="h-4 w-4" />
            <span>Signaler cette offre</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div onClick={handleDialogClick}>
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
      </div>
    </>
  );
}
