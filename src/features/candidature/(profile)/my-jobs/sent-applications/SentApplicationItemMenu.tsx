/**
 * SentApplicationItemMenu - Dropdown menu component for SentApplicationItem
 *
 * This component handles the dropdown menu functionality and related dialogs
 * for a sent application item, including reporting and removing applications.
 *
 * Props:
 * - applied: The application data
 */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  ExternalLink,
  Archive,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import type { EmploisApplied } from "@/core/interfaces";
import dynamic from "next/dynamic";
import Link from "next/link";

const ArchiveJobDialog = dynamic(
  () => import("../components/ArchiveJobDialog"),
  {
    ssr: false,
  }
);

const RemoveApplyEmploi = dynamic(
  () => import("./RemoveApplyEmploi").then((mod) => mod.RemoveApplyEmploi),
  {
    ssr: false,
  }
);

const ReportJobDialog = dynamic(
  () => import("../../../../../components/shared/ReportJobDialog"),
  {
    ssr: false,
  }
);

interface SentApplicationItemMenuProps {
  applied: EmploisApplied;
}

export function SentApplicationItemMenu({
  applied,
}: SentApplicationItemMenuProps) {
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link
              href={`/profile/my-jobs/application-details/${applied.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Voir les détails
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setIsArchiveDialogOpen(true)}
          >
            <Archive className="h-4 w-4" />
            Archiver
          </DropdownMenuItem>
          {applied.status !== "WITHDRAWN" && (
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive"
              onClick={() => setIsRemoveDialogOpen(true)}
              disabled={applied.status === "WITHDRAWN"}
            >
              <XCircle className="h-4 w-4" />
              Retirer la candidature
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="flex items-center gap-2 text-destructive"
            onClick={() => setIsReportDialogOpen(true)}
          >
            <AlertTriangle className="h-4 w-4" />
            Signaler l&apos;offre d&apos;emploi
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isArchiveDialogOpen && (
        <ArchiveJobDialog
          open={isArchiveDialogOpen}
          onOpenChange={setIsArchiveDialogOpen}
          jobId={applied.emploi.uuid}
          jobTitle={applied.emploi.title}
        />
      )}

      {isReportDialogOpen && (
        <ReportJobDialog
          open={isReportDialogOpen}
          onOpenChange={setIsReportDialogOpen}
          jobId={applied.uuid}
        />
      )}
      {applied.status !== "WITHDRAWN" && isRemoveDialogOpen && (
        <RemoveApplyEmploi
          emploi_uuid={applied.emploi.uuid}
          emploi_title={applied.emploi.title}
          open={isRemoveDialogOpen}
          onOpenChange={setIsRemoveDialogOpen}
        />
      )}
    </>
  );
}
