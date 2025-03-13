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
import { ReportJobDialog } from "@/features/candidature/(profile)/components/my-jobs/ReportJobDialog";
import { NotInterestedDialog } from "./NotInterestedDialog";

interface JobCardMenuProps {
  jobId: string;
  onNotInterested?: (jobId: string) => void;
  isBookmarked?: boolean;
  onBookmark?: () => void;
}

export function JobCardMenu({
  jobId,
  onNotInterested,
  isBookmarked,
  onBookmark,
}: JobCardMenuProps) {
  const [isSignalerOpen, setIsSignalerOpen] = useState(false);
  const [isNotInterestedOpen, setIsNotInterestedOpen] = useState(false);

  const handleNotInterested = (id: string) => {
    onNotInterested?.(id);
    setIsNotInterestedOpen(false);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.();
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleBookmarkClick}
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
