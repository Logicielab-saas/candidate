"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { JobsList } from "./JobsList";
import { JobDetails } from "./JobDetails";

export function JobsContainer() {
  const [isMobileView, setIsMobileView] = useState(false);
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2", "gap-8 pt-10")}>
      {/* Jobs List Section */}
      <div className="lg:border-r lg:pr-8">
        <JobsList />
      </div>

      {/* Job Details Section - Will be implemented later */}
      <div className="hidden lg:block">
        <JobDetails />
      </div>
    </div>
  );
}
