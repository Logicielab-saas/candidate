"use client";

import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Ban,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { statusStyles } from "@/core/styles/status-styles.style";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import type { EmploisApplied } from "@/core/interfaces";
import { SentApplicationItemMenu } from "./SentApplicationItemMenu";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

interface SentApplicationItemProps {
  applied: EmploisApplied;
}

const getCompanyInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function SentApplicationItem({ applied }: SentApplicationItemProps) {
  const getStatusInfo = () => {
    if (applied.emploi.status === "closed") {
      return {
        icon: <Ban className="h-3.5 w-3.5" />,
        label: "Offre expirée",
        style: statusStyles.expired,
      };
    }

    switch (applied.status) {
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
                <AvatarImage
                  src={applied.emploi.company_logo || ""}
                  alt={applied.emploi.company_name || ""}
                />
                <AvatarFallback className="text-xs font-medium">
                  {getCompanyInitials(applied.emploi.company_name || "")}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <Link
              href={`/profile/my-jobs/application-details/${applied.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {applied.emploi.title}
            </Link>
          </div>

          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{applied.emploi.company_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{applied.emploi.city_name || "Inconnu"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Candidature envoyée le{" "}
                {format(new Date(applied.applied_at), "d MMM yyyy", {
                  locale: fr,
                })}
              </span>
            </div>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={applied.status}
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
          {/* <UpdateStatusDialog
            onStatusUpdate={handleStatusUpdate}
            currentStatus={applied.status}
            open={isUpdateDialogOpen}
            onOpenChange={setIsUpdateDialogOpen}
            trigger={
              <Button
                disabled={
                  jobExpired || statuses.candidateStatus.status === "WITHDRAWN"
                }
              >
                Mettre à jour le statut
              </Button>
            }
          /> */}

          <SentApplicationItemMenu applied={applied} />
        </div>
      </div>
      <Separator />

      {/* <ConfirmWithdrawDialog
        open={isWithdrawDialogOpen}
        onOpenChange={setIsWithdrawDialogOpen}
        onConfirm={() => onUpdateStatus(applied.uuid, "WITHDRAWN")}
      /> */}
    </motion.div>
  );
}
