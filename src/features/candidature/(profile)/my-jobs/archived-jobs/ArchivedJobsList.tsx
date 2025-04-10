/**
 * ArchivedJobsList - Displays a list of archived job applications
 *
 * This component shows all archived job applications and provides
 * functionality to unarchive them if needed. Includes loading states,
 * error handling, and pagination.
 *
 * Props:
 * - archivedJobs: ArchivedJobsResponse containing jobs and pagination data
 * - isLoading: Loading state indicator
 * - error: Error object if request failed
 * - onPageChange: Function to handle pagination
 */
"use client";

import { ArchivedJobItem } from "./ArchivedJobItem";
import { motion, AnimatePresence } from "framer-motion";
import type { ArchivedJobsResponse } from "../services/my-archived-jobs";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { ArchivedJob } from "@/core/interfaces";

// Animation configuration for the container
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface ArchivedJobsListProps {
  archivedJobs?: ArchivedJobsResponse;
  isLoading: boolean;
  error: Error | null;
  onPageChange: (page: number) => void;
}

// Loading skeleton component for archived jobs
function ArchivedJobsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-start gap-4 py-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArchivedJobsList({
  archivedJobs,
  isLoading,
  error,
  onPageChange,
}: ArchivedJobsListProps) {
  if (isLoading) {
    return <ArchivedJobsSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Une erreur est survenue lors du chargement des emplois archivés.
          Veuillez réessayer plus tard.
        </AlertDescription>
      </Alert>
    );
  }

  if (!archivedJobs?.archives || archivedJobs.archives.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          Vous n&apos;avez pas encore d&apos;emplois archivés.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-border"
      >
        <AnimatePresence mode="popLayout">
          {archivedJobs.archives.map((job: ArchivedJob) => (
            <ArchivedJobItem
              key={job.uuid}
              jobId={job.emploi_uuid}
              jobTitle={job.emploi_title}
              company={{
                name: job.emploi_title.split(" - ")[1] || "Entreprise",
              }}
              location="France" // This should come from the API if available
              savedDate={new Date(job.created_at).toLocaleDateString("fr-FR")}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {archivedJobs.pagination && archivedJobs.pagination.total > 0 && (
        <Pagination
          currentPage={archivedJobs.pagination.current_page}
          totalPages={Math.ceil(
            archivedJobs.pagination.total / archivedJobs.pagination.per_page
          )}
          perPage={archivedJobs.pagination.per_page}
          totalItems={archivedJobs.pagination.total}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
