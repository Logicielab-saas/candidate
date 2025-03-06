/**
 * JobsList - Displays a list of job cards with filtering based on search params
 *
 * Features:
 * - Responsive grid layout
 * - Filters jobs based on search text, city, date, and multiple contract types
 * - Shows job details like company, location, and keywords
 * - Handles mobile navigation to detail pages
 */

"use client";

import { mockJobsList } from "@/core/mockData/jobs-list";
import { useQueryState } from "nuqs";
import { JobCard } from "./JobCard";
import { useNotInterestedStore } from "../store/not-interested.store";
import { useRouter } from "next/navigation";
import { subDays } from "date-fns";

interface JobsListProps {
  isDesktop: boolean;
}

export function JobsList({ isDesktop }: JobsListProps) {
  const [searchText] = useQueryState("q");
  const [selectedCity] = useQueryState("city");
  const [selectedJobId, setSelectedJobId] = useQueryState("jobId");
  const [dateFilter] = useQueryState("date");
  const [contractTypes] = useQueryState("contracts", {
    parse: (value) => value.split(","),
    serialize: (value) => value.join(","),
    defaultValue: [],
  });
  const { isNotInterested } = useNotInterestedStore();
  const router = useRouter();

  // Filter jobs based on all search params
  const filteredJobs = mockJobsList.filter((job) => {
    // Text search filter
    const matchesSearch =
      !searchText ||
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
      job.keyWords.some((keyword) =>
        keyword.toLowerCase().includes(searchText.toLowerCase())
      );

    // City filter
    const matchesCity =
      !selectedCity || job.city.toLowerCase() === selectedCity.toLowerCase();

    // Date filter
    let matchesDate = true;
    if (dateFilter) {
      const jobDate = new Date(job.postedAt);
      const now = new Date();
      switch (dateFilter) {
        case "24h":
          matchesDate = jobDate >= subDays(now, 1);
          break;
        case "week":
          matchesDate = jobDate >= subDays(now, 7);
          break;
        case "month":
          matchesDate = jobDate >= subDays(now, 30);
          break;
      }
    }

    // Contract types filter - match if any selected contract type matches any job keyword
    const matchesContract =
      !contractTypes?.length ||
      contractTypes.some((type) =>
        job.keyWords.some(
          (keyword) => keyword.toLowerCase() === type.toLowerCase()
        )
      );

    return matchesSearch && matchesCity && matchesDate && matchesContract;
  });

  const handleJobSelect = (jobId: string) => {
    // Don't select if job is marked as not interested
    if (!isNotInterested(jobId)) {
      if (isDesktop) {
        // On desktop, update the URL parameter for the side panel
        setSelectedJobId(jobId);
      } else {
        // On mobile, navigate to the details page
        router.push(`/annonce-details/${jobId}`);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Available Positions</h2>
        <span className="text-sm text-muted-foreground">
          {filteredJobs.length} jobs found
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.map((job) => (
          <div key={job.id} onClick={() => handleJobSelect(job.id)}>
            <JobCard job={job} isSelected={job.id === selectedJobId} />
          </div>
        ))}
      </div>
    </div>
  );
}
