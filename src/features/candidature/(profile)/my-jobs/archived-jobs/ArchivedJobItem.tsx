/**
 * ArchivedJobItem - Individual archived job item component
 *
 * Displays information about an archived job and provides
 * functionality to unarchive it or report it.
 *
 * Props:
 * - jobId: Unique identifier for the job
 * - jobTitle: Title of the job
 * - company: Company information object
 * - location: Job location
 * - savedDate: Date when the job was archived
 * - onUnarchive: Callback function to unarchive the job
 */
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
import dynamic from "next/dynamic";
import { useState } from "react";
import { useUnarchiveJob } from "../hooks/use-my-archived-jobs";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/core/utils/date";
import { getCompanyInitials } from "@/core/utils";

const ReportJobDialog = dynamic(
  () => import("@/components/shared/ReportJobDialog"),
  { ssr: false }
);

interface ArchivedJobItemProps {
  jobId: string;
  jobTitle: string;
  company: {
    name: string;
  };
  location: string;
  savedDate: string;
}

export function ArchivedJobItem({
  jobId,
  jobTitle,
  company,
  location,
  savedDate,
}: ArchivedJobItemProps) {
  const tCommon = useTranslations("common");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const { mutate: unarchiveJob, isPending: isUnarchiving } =
    useUnarchiveJob(tCommon);

  const locale = useLocale();

  // Format the date once for use in translation
  const formattedDate = formatDate(savedDate, "d MMM yyyy", locale);

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
            <span className="font-medium">{jobTitle}</span>
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
              <span>
                {tCommon("actions.archivedAt", {
                  date: formattedDate,
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => unarchiveJob(jobId)}
            size="sm"
            disabled={isUnarchiving}
          >
            {isUnarchiving
              ? tCommon("actions.unArchiving")
              : tCommon("actions.unArchive")}
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
                {tCommon("actions.reportJob")}
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
