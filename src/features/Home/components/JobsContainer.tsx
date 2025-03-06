/**
 * JobsContainer - Container component for jobs list and details
 * Handles responsive layout and navigation
 */

"use client";

import { cn } from "@/lib/utils";
import { JobsList } from "./JobsList";
import { JobDetails } from "./JobDetails";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export function JobsContainer() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [, setJobId] = useQueryState("jobId");

  // Clear jobId when switching to mobile
  useEffect(() => {
    if (!isDesktop) {
      setJobId(null);
    }
  }, [isDesktop, setJobId]);

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-5", "gap-8 pt-10")}>
      {/* Jobs List Section - 40% width */}
      <div className="lg:col-span-2 lg:border-r lg:pr-8">
        <JobsList isDesktop={isDesktop} />
      </div>

      {/* Job Details Section - 60% width, Only shown on desktop */}
      {isDesktop && (
        <div className="hidden lg:block lg:col-span-3">
          <JobDetails />
        </div>
      )}
    </div>
  );
}
