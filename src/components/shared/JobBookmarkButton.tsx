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
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface JobBookmarkButtonProps {
  jobId: string;
  jobSlug: string;
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
  jobSlug,
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
  // Local state to track the current saved status
  const [localIsSaved, setLocalIsSaved] = useState(initialIsSaved);
  const t = useTranslations("emplois.jobCard.menu.bookmark");

  // Update local state when initialIsSaved changes
  useEffect(() => {
    setLocalIsSaved(initialIsSaved);
  }, [initialIsSaved, jobId]);

  const { isProcessing, toggleSaved } = useJobBookmark({
    initialIsSaved: localIsSaved,
    jobId,
    jobSlug,
    jobTitle,
    onSaveSuccess: () => {
      setLocalIsSaved(true);
      onSaveSuccess?.();
    },
    onUnsaveSuccess: () => {
      setLocalIsSaved(false);
      onUnsaveSuccess?.();
    },
  });

  const heartIconClasses = getHeartIconClasses(localIsSaved, isProcessing);

  const actionButtonContent = (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <span
        className={cn(
          "h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-accent rounded-full",
          localIsSaved && "text-primary hover:text-primary/80",
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
        aria-label={localIsSaved ? t("remove") : t("add")}
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
        aria-label={localIsSaved ? t("remove") : t("add")}
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
          {localIsSaved ? t("remove") : t("add")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
