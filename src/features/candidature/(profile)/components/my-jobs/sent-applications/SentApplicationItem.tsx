"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MoreVertical,
  Building2,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Ban,
  ThumbsUp,
  ExternalLink,
  Archive,
  AlertTriangle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Job, JobStatuses, CandidateStatus } from "@/core/types";
import { statusStyles } from "@/core/styles/status-styles.style";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UpdateStatusDialog } from "./UpdateStatusDialog";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReportJobDialog } from "../ReportJobDialog";

interface SentApplicationItemProps
  extends Pick<
    Job,
    "jobTitle" | "company" | "location" | "applyTime" | "jobExpired" | "jobUrl"
  > {
  statuses: JobStatuses;
  onUpdateStatus: (jobId: string, newStatus: CandidateStatus) => void;
  jobId: string;
  onArchive: (jobId: string) => void;
}

const formatDate = (timestamp: number) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(new Date(timestamp));
};

const getCompanyInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function SentApplicationItem({
  jobTitle,
  company,
  location,
  applyTime,
  statuses,
  jobExpired,
  jobUrl,
  onUpdateStatus,
  jobId,
  onArchive,
}: SentApplicationItemProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const handleStatusUpdate = (newStatus: CandidateStatus) => {
    onUpdateStatus(jobId, newStatus);
    setIsUpdateDialogOpen(false);
  };

  const getStatusInfo = () => {
    const { candidateStatus, employerJobStatus } = statuses;

    if (jobExpired || employerJobStatus.status === "EXPIRED") {
      return {
        icon: <Ban className="h-3.5 w-3.5" />,
        label: "Offre expirée",
        style: statusStyles.expired,
      };
    }

    switch (candidateStatus.status) {
      case "APPLIED":
        return {
          icon: <Clock className="h-3.5 w-3.5" />,
          label: "Candidature envoyée",
          style: statusStyles.applied,
        };
      case "INTERVIEWED":
        return {
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
          label: "Entretien programmé",
          style: statusStyles.interviewed,
        };
      case "OFFER_RECEIVED":
        return {
          icon: <ThumbsUp className="h-3.5 w-3.5" />,
          label: "Offre reçue",
          style: statusStyles.interviewed,
        };
      case "REJECTED":
        return {
          icon: <XCircle className="h-3.5 w-3.5" />,
          label: "Candidature rejetée",
          style: statusStyles.rejected,
        };
      case "HIRED":
        return {
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
          label: "Candidature acceptée",
          style: statusStyles.hired,
        };
      case "NOT_INTERESTED":
        return {
          icon: <Ban className="h-3.5 w-3.5" />,
          label: "Plus intéressé",
          style: statusStyles.expired,
        };
      case "WITHDRAWN":
        return {
          icon: <XCircle className="h-3.5 w-3.5" />,
          label: "Candidature retirée",
          style: statusStyles.withdrawn,
        };
      default:
        return {
          icon: <AlertCircle className="h-3.5 w-3.5" />,
          label: "Statut inconnu",
          style: statusStyles.expired,
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleArchive = (jobId: string) => {
    // Logic to archive the job application
    console.log("Archiving job:", jobId);
    // Call a function to update the state in the parent component
    onArchive(jobId);
  };

  const handleWithdraw = () => {
    if (
      window.confirm("Êtes-vous sûr de vouloir retirer votre candidature ?")
    ) {
      onUpdateStatus(jobId, "WITHDRAWN"); // Update the status to WITHDRAWN
    }
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
              <span>Candidature envoyée le {formatDate(applyTime)}</span>
            </div>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={statuses.candidateStatus.status}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="mt-2"
              >
                <div className={cn(statusStyles.base, statusInfo.style)}>
                  {statusInfo.icon}
                  <span>{statusInfo.label}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <UpdateStatusDialog
            onStatusUpdate={handleStatusUpdate}
            currentStatus={statuses.candidateStatus.status}
            open={isUpdateDialogOpen}
            onOpenChange={setIsUpdateDialogOpen}
            trigger={
              <Button disabled={jobExpired}>Mettre à jour le statut</Button>
            }
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <a
                  href={`/profile/my-jobs/application-details/${jobId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Voir les détails
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => handleArchive(jobId)}
              >
                <Archive className="h-4 w-4" />
                Archiver
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 text-destructive"
                onClick={jobExpired ? undefined : handleWithdraw}
                disabled={jobExpired}
              >
                <XCircle className="h-4 w-4" />
                Retirer la candidature
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 text-destructive"
                onClick={() => setIsReportDialogOpen(true)}
              >
                <AlertTriangle className="h-4 w-4" />
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
