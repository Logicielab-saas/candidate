/**
 * SavedJobsList - Displays a list of bookmarked jobs with pagination
 *
 * This component receives saved jobs data from the parent container and
 * renders them in a list with animation effects.
 */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SavedJobItem } from "./SavedJobItem";
import { SavedJobsItemSkeleton } from "../skeletons/SavedJobsItemSkeleton";
import type { SavedJobsResponse } from "../services/my-saved-jobs";
import dynamic from "next/dynamic";

const Pagination = dynamic(
  () => import("@/components/ui/pagination").then((mod) => mod.Pagination),
  {
    ssr: false,
  }
);

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

interface SavedJobsListProps {
  savedJobsData?: SavedJobsResponse;
  isLoading: boolean;
  error: Error | null;
  onPageChange: (page: number) => void;
}

export default function SavedJobsList({
  savedJobsData,
  isLoading,
  error,
  onPageChange,
}: SavedJobsListProps) {
  if (isLoading) {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-border"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <SavedJobsItemSkeleton key={index} />
        ))}
      </motion.div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  if (!savedJobsData || savedJobsData.saved.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <h3 className="font-medium text-lg mb-2">Aucun emploi enregistré</h3>
        <p className="text-muted-foreground">
          Vous n&apos;avez pas encore enregistré d&apos;offres d&apos;emploi.
          Parcourez les offres disponibles et cliquez sur le cœur pour les
          ajouter ici.
        </p>
      </div>
    );
  }

  const { pagination } = savedJobsData;

  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-border"
      >
        <AnimatePresence mode="popLayout">
          {savedJobsData.saved.map((saved) => (
            <SavedJobItem saved={saved} key={saved.uuid} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Only show pagination if there's more than one page */}
      {pagination && pagination.last_page > 1 && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.last_page}
          perPage={pagination.per_page}
          totalItems={pagination.total}
          onPageChange={onPageChange}
          className="mt-6"
        />
      )}
    </div>
  );
}
