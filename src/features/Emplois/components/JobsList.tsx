/**
 * JobsList - Displays a list of job cards with filtering based on search params
 *
 * Features:
 * - Responsive grid layout
 * - Filters jobs based on search text, city, date, keywords, and contract types
 * - Shows job details like company, location, and keywords
 * - Handles mobile navigation to detail pages
 */

"use client";

import { useQueryState } from "nuqs";
import { JobCard } from "./JobCard";
import { useRouter } from "next/navigation";
import { useEmplois } from "../hooks/use-emplois";
import { useEffect } from "react";
import { useSavedJobsStore } from "../store/saved-jobs.store";
import { JobCardSkeleton } from "../skeletons/JobCardSkeleton";

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

  // Fetch jobs from API
  const { data: jobs, isLoading, error } = useEmplois();

  // Initialize saved jobs when data is loaded
  useEffect(() => {
    if (jobs) {
      initializeSavedJobs(jobs);
    }
  }, [jobs, initializeSavedJobs]);

  // Filter jobs based on search text and city only for now
  /* Commenting out filters for now
  const filteredJobs = jobs.filter((job: Emplois) => {
    // Text search filter
    const matchesSearch =
      !searchText ||
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchText.toLowerCase());

    // City filter
    const matchesCity =
      !selectedCity ||
      job.city_name.toLowerCase() === selectedCity.toLowerCase();

    return matchesSearch && matchesCity;
  });
  */

  // Handle job card click
  const handleJobClick = (jobSlug: string) => {
    if (isDesktop) {
      setSelectedJobId(jobSlug);
    } else {
      router.push(`/annonce-details/${jobSlug}`);
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
          {jobs?.length || 0} jobs found
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
      </div>
    </div>
  );
}
