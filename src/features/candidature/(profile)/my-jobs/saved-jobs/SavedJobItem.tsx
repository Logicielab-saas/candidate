"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MoreVertical,
  Building2,
  MapPin,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useState } from "react";
import type { EmploiSaved } from "@/core/interfaces";
import Link from "next/link";
import { linkLikeButtonStyle } from "@/core/styles/links";
import { JobBookmarkButton } from "@/components/shared/JobBookmarkButton";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const ReportJobDialog = dynamic(
  () => import("../../../../../components/shared/ReportJobDialog"),
  { ssr: false }
);

interface SavedJobItemProps {
  saved: EmploiSaved;
}

const getCompanyInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function SavedJobItem({ saved }: SavedJobItemProps) {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const tCommon = useTranslations("common");

  // Handle successful unsave/removal
  const handleUnsaveSuccess = () => {
    // After a short delay, make the item invisible to animate it out
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  const formattedDate = format(new Date(saved.saved_at), "d MMM yyyy");

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
                <AvatarImage alt={saved.emploi.company_name || ""} />
                <AvatarFallback className="text-xs font-medium">
                  {getCompanyInitials(saved.emploi.company_name || "")}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <Link
              href={`/annonce-details/${saved.emploi.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {saved.emploi.title || ""}
            </Link>
          </div>

          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{saved.emploi.company_name || ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{saved.emploi.city_name || ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{tCommon("actions.savedAt", { date: formattedDate })}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={`/job-apply/${saved.emploi.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={linkLikeButtonStyle}
            >
              {tCommon("actions.apply")}
            </Link>
          </motion.div>

          <JobBookmarkButton
            jobId={saved.emploi.uuid}
            jobSlug={saved.emploi.slug}
            initialIsSaved={true}
            onUnsaveSuccess={handleUnsaveSuccess}
          />

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
                <AlertTriangle className="h-4 w-4" />{" "}
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
          jobId={saved.emploi.uuid}
        />
      )}
    </motion.div>
  );
}
