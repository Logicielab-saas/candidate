"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MoreVertical,
  Building2,
  MapPin,
  Calendar,
  BookmarkCheck,
  Bookmark,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import type { SavedJob } from "@/core/types";
import { useState } from "react";
import { ReportJobDialog } from "../ReportJobDialog";

interface SavedJobItemProps extends Omit<SavedJob, "id"> {
  jobId: string;
  onApply: () => void;
  onRemove: () => void;
  bookmarked: boolean;
}

const getCompanyInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function SavedJobItem({
  jobId,
  title,
  company,
  location,
  savedDate,
  onApply,
  onRemove,
  jobUrl,
  bookmarked,
}: SavedJobItemProps) {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleReport = (reason: string, additionalInfo: string) => {
    // TODO: Implement the logic to handle the report
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="py-4 flex items-start justify-between group">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage alt={company.name} />
                <AvatarFallback className="text-xs font-medium">
                  {getCompanyInitials(company.name)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <a
              href={jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {title}
            </a>
          </div>

          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{company.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Enregistré le {savedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={onApply} size="sm">
              Postuler
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="text-muted-foreground hover:text-primary"
            >
              {bookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-primaryHex-400" />
              ) : (
                <Bookmark className="h-5 w-5 text-gray-400" />
              )}
            </Button>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setIsReportDialogOpen(true)}
              >
                Signaler l&apos;offre d&apos;emploi
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
      <ReportJobDialog
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
        jobId={jobId}
      />
    </motion.div>
  );
}
