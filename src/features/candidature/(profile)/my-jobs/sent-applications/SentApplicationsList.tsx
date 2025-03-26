/**
 * SentApplicationsList - Displays a list of active job applications with pagination
 *
 * This component receives job applications data from the parent container and displays them
 * with pagination controls and animation effects.
 */
"use client";

import { SentApplicationItem } from "./SentApplicationItem";
import { motion, AnimatePresence } from "framer-motion";
import { SentApplicationItemSkeleton } from "../skeletons/SentApplicationItemSkeleton";
import dynamic from "next/dynamic";
import type { SentApplicationsResponse } from "../services/my-applied-jobs";

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

interface SentApplicationsListProps {
  sentApplicationsData?: SentApplicationsResponse;

  isLoading: boolean;
  error: Error | null;
  onPageChange: (page: number) => void;
}

export function SentApplicationsList({
  sentApplicationsData,
  isLoading,
  error,
  onPageChange,
}: SentApplicationsListProps) {
  // Show skeleton loading state
  if (isLoading) {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-border"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <SentApplicationItemSkeleton key={index} />
        ))}
      </motion.div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;
  if (!sentApplicationsData || sentApplicationsData.applied.length === 0)
    return (
      <div className="text-center py-6 text-muted-foreground">
        Aucune candidature trouvée.
      </div>
    );

  const { pagination } = sentApplicationsData;

  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-border"
      >
        {/* AnimatePresence enables exit animations when items are removed */}
        <AnimatePresence mode="popLayout">
          {sentApplicationsData.applied.map((applied) => (
            <SentApplicationItem applied={applied} key={applied.uuid} />
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
