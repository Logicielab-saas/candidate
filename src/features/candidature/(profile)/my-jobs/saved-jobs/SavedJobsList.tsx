/**
 * SavedJobsList - Displays a list of bookmarked jobs with pagination
 *
 * This component fetches and displays jobs that have been bookmarked by the user
 * and renders them in a list with animation effects and pagination.
 */
"use client";

import { SavedJobItem } from "./SavedJobItem";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchSavedEmplois } from "../hooks/use-my-saved-jobs";
import { useQueryState } from "nuqs";
import { Pagination } from "@/components/ui/pagination";
import { SavedJobsItemSkeleton } from "../skeletons/SavedJobsItemSkeleton";

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

export function SavedJobsList() {
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

  const { data, isLoading, error } = useFetchSavedEmplois(page, perPage);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPageStr(newPage.toString());

    // Scroll to top of the list when page changes
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  if (!data || data.saved.length === 0) {
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

  const { pagination } = data;

  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-border"
      >
        <AnimatePresence mode="popLayout">
          {data.saved.map((saved) => (
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
          onPageChange={handlePageChange}
          className="mt-6"
        />
      )}
    </div>
  );
}
