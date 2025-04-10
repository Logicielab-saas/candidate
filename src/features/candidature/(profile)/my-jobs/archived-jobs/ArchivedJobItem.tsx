"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MoreVertical, Building2, MapPin, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import type { Job } from "@/core/types";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReportJobDialog = dynamic(
  () => import("../../../../../components/shared/ReportJobDialog"),
  { ssr: false }
);

interface ArchivedJobItemProps extends Omit<Job, "id"> {
  onUnarchive: () => void;
  savedDate: string;
  jobId: string;
}

const getCompanyInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function ArchivedJobItem({
  jobTitle,
  company,
  location,
  savedDate,
  jobUrl,
  onUnarchive,
  jobId,
}: ArchivedJobItemProps) {
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
            <Avatar className="h-10 w-10">
              <AvatarImage alt={company.name} />
              <AvatarFallback className="text-xs font-medium">
                {getCompanyInitials(company.name)}
              </AvatarFallback>
            </Avatar>
            <a
              href={jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {jobTitle}
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
              <span>Archivé le {savedDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onUnarchive} size="sm">
            Désarchiver
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setIsReportDialogOpen(true)}
                className="text-destructive"
              >
                Signaler l&apos;offre d&apos;emploi
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
      {isReportDialogOpen && (
        <ReportJobDialog
          open={isReportDialogOpen}
          onOpenChange={setIsReportDialogOpen}
          jobId={jobId}
        />
      )}
    </motion.div>
  );
}
