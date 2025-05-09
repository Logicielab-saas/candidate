/**
 * AnnonceStatusAlert - Displays job status alerts
 *
 * Renders status alerts for job applications showing if a job is saved,
 * applied to, or archived using Shadcn UI Alert component with appropriate
 * styling and icons.
 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { EmploisDetails } from "@/core/interfaces";
import { BookmarkIcon, CheckCircle2Icon, ArchiveIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface AnnonceStatusAlertProps {
  annonce: EmploisDetails;
}

export function AnnonceStatusAlert({ annonce }: AnnonceStatusAlertProps) {
  const t = useTranslations("annonces");

  if (!annonce.is_saved && !annonce.is_applied && !annonce.archived) {
    return null;
  }

  return (
    <div className="space-y-4">
      {annonce.is_applied && (
        <Alert
          variant="default"
          className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900"
        >
          <CheckCircle2Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-300 ml-2">
            {t("details.status.applied.title")}
          </AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400 ml-2">
            {t("details.status.applied.description")}
          </AlertDescription>
        </Alert>
      )}

      {annonce.is_saved && (
        <Alert
          variant="default"
          className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900"
        >
          <BookmarkIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300 ml-2">
            {t("details.status.saved.title")}
          </AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400 ml-2">
            {t("details.status.saved.description")}
          </AlertDescription>
        </Alert>
      )}

      {annonce.archived && (
        <Alert
          variant="default"
          className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900"
        >
          <ArchiveIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <AlertTitle className="text-orange-800 dark:text-orange-300 ml-2">
            {t("details.status.archived.title")}
          </AlertTitle>
          <AlertDescription className="text-orange-700 dark:text-orange-400 ml-2">
            {t("details.status.archived.description")}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
