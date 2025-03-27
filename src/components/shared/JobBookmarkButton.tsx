/**
 * JobBookmarkButton - Reusable heart/bookmark button for jobs
 *
 * A button component that displays a heart icon which can be toggled between
 * filled/unfilled states, representing saved/unsaved status. Handles all the
 * necessary API calls and state management.
 */
"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useJobBookmark,
  getHeartIconClasses,
} from "@/core/utils/job-bookmark-handler";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface JobBookmarkButtonProps {
  jobId: string;
  initialIsSaved: boolean;
  jobTitle?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  className?: string;
  iconClassName?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "secondary" | "ghost" | "outline" | "link";
  tooltipEnabled?: boolean;
  onSaveSuccess?: () => void;
  onUnsaveSuccess?: () => void;
  buttonStyle?: "action" | "default";
}

export function JobBookmarkButton({
  jobId,
  initialIsSaved,
  jobTitle,
  tooltipPosition = "top",
  className,
  iconClassName,
  size = "icon",
  variant = "ghost",
  tooltipEnabled = true,
  onSaveSuccess,
  onUnsaveSuccess,
  buttonStyle = "default",
}: JobBookmarkButtonProps) {
  const { isSaved, isProcessing, toggleSaved } = useJobBookmark({
    initialIsSaved,
    jobId,
    jobTitle,
    onSaveSuccess,
    onUnsaveSuccess,
  });

  const heartIconClasses = getHeartIconClasses(isSaved, isProcessing);

  const actionButtonContent = (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <span
        className={cn(
          "h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-accent rounded-full",
          isSaved && "text-primary hover:text-primary/80",
          isProcessing && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        onClick={(e) => {
          if (isProcessing) return;
          e.preventDefault();
          e.stopPropagation();
          toggleSaved();
        }}
        aria-disabled={isProcessing}
        role="button"
        aria-label={isSaved ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Heart className={cn(heartIconClasses, iconClassName)} />
      </span>
    </motion.div>
  );

  const defaultButtonContent = (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        variant={variant}
        size={size}
        className={cn(
          "text-muted-foreground hover:text-primary",
          { "cursor-not-allowed": isProcessing },
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSaved();
        }}
        disabled={isProcessing}
        aria-label={isSaved ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Heart className={cn(heartIconClasses, iconClassName)} />
      </Button>
    </motion.div>
  );

  const content =
    buttonStyle === "action" ? actionButtonContent : defaultButtonContent;

  if (!tooltipEnabled) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side={tooltipPosition} className="text-sm">
          {isSaved ? "Retirer des favoris" : "Ajouter aux favoris"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
