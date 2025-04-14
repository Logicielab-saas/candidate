/**
 * JobsList - Displays a list of job cards with filtering based on search params
 *
 * Features:
 * - Responsive grid layout
 * - Filters jobs based on search text, city, date, keywords, and contract types
 * - Shows job details like company, location, and keywords
 * - Handles mobile navigation to detail pages
 * - Supports infinite loading with Load More button
 */

"use client";

import { useQueryState } from "nuqs";
import { JobCard } from "./JobCard";
import { useRouter } from "next/navigation";
import { useEmplois } from "../hooks/use-emplois";
import { useEffect } from "react";
import { useSavedJobsStore } from "../store/saved-jobs.store";
import { JobCardSkeleton } from "../skeletons/JobCardSkeleton";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel } from "lucide-react";

interface JobsListProps {
  isDesktop: boolean;
}

export function JobsList({ isDesktop }: JobsListProps) {
  const [_searchText] = useQueryState("q");
  const [_selectedCity] = useQueryState("city");
  const [selectedJobId, setSelectedJobId] = useQueryState("job");
  const router = useRouter();
  const initializeSavedJobs = useSavedJobsStore(
    (state) => state.initializeSavedJobs
  );

  // Fetch jobs from API with pagination
  const {
    data: jobs,
    pagination,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useEmplois();

  // Initialize saved jobs
  useEffect(() => {
    if (jobs) {
      initializeSavedJobs(jobs);

      // Handle mobile navigation
      if (!isDesktop && jobs.length > 0 && selectedJobId && !isLoading) {
        router.push(`/annonce-details/${selectedJobId}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs, initializeSavedJobs, isDesktop, selectedJobId, isLoading]);

  // Handle job card click
  const handleJobClick = (jobSlug: string) => {
    if (isDesktop) {
      setSelectedJobId(jobSlug);
    } else {
      router.push(`/annonce-details/${jobSlug}`);
    }
  };

  // Handle load more click
  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Available Positions</h2>
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-destructive">
            Error loading jobs
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Available Positions</h2>
        <span className="text-sm text-muted-foreground">
          {pagination?.total} jobs found
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {jobs?.map((job) => (
          <div
            key={job.slug}
            onClick={() => handleJobClick(job.slug)}
            className="cursor-pointer"
          >
            <JobCard job={job} isSelected={job.slug === selectedJobId} />
          </div>
        ))}

        {!jobs?.length && (
          <div className="text-center p-8 border rounded-lg">
            <p className="text-muted-foreground">
              No jobs match your search criteria.
            </p>
          </div>
        )}

        {hasNextPage && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              className="w-full max-w-[200px]"
            >
              {isFetchingNextPage ? (
                <>
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                `Load More (${
                  pagination ? pagination.total - jobs.length : 0
                } remaining)`
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
