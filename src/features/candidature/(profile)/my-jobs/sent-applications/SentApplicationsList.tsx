/**
 * SentApplicationsList - Displays a list of active job applications with pagination
 *
 * This component shows all non-archived job applications with pagination controls
 * and provides functionality to update their status or archive them.
 * Uses URL query parameters for state management with nuqs.
 */
"use client";

import { SentApplicationItem } from "./SentApplicationItem";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchSentApplications } from "../hooks/use-my-applied-jobs";
import { SentApplicationItemSkeleton } from "../skeletons/SentApplicationItemSkeleton";
import { Pagination } from "@/components/ui/pagination";
import { useQueryState } from "nuqs";

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

export function SentApplicationsList() {
  // URL query state for pagination
  const [pageStr, setPageStr] = useQueryState("page", {
    parse: (value) => value,
    serialize: (value) => value,
  });

  const [perPageStr, _setPerPageStr] = useQueryState("perPage", {
    parse: (value) => value,
    serialize: (value) => value,
  });

  // Convert string values to numbers
  const page = pageStr ? parseInt(pageStr) : 1;
  const perPage = perPageStr ? parseInt(perPageStr) : 10;

  const {
    data: sentApplications,
    isLoading,
    error,
  } = useFetchSentApplications(page, perPage);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPageStr(newPage.toString());

    // Scroll to top of the list when page changes
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
  if (!sentApplications || sentApplications.applied.length === 0)
    return (
      <div className="text-center py-6 text-muted-foreground">
        Aucune candidature trouvée.
      </div>
    );

  const { pagination } = sentApplications;

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
          {sentApplications.applied.map((applied) => (
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
          onPageChange={handlePageChange}
          className="mt-6"
        />
      )}
    </div>
  );
}
