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
  const [keywords] = useQueryState("keyword", {
    parse: (value) => value?.split(",") || [],
    serialize: (value) => value?.join(","),
  });
  const { isNotInterested } = useNotInterestedStore();
  const router = useRouter();

  // Filter jobs based on all search params
  const filteredJobs = mockJobsList.filter((job) => {
    // Skip jobs marked as not interested
    if (isNotInterested(job.id)) return false;

    // Text search filter
    const matchesSearch =
      !searchText ||
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchText.toLowerCase()) ||
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

    // Keywords filter - match if any selected keyword matches any job keyword
    const matchesKeywords =
      !keywords?.length ||
      keywords.some((keyword) =>
        job.keyWords.some((jobKeyword) =>
          jobKeyword.toLowerCase().includes(keyword.toLowerCase())
        )
      );

    // Contract types filter - match if any selected contract type matches any job keyword
    const matchesContract =
      !contractTypes?.length ||
      contractTypes.some((type) =>
        job.keyWords.some(
          (keyword) => keyword.toLowerCase() === type.toLowerCase()
        )
      );

    return (
      matchesSearch &&
      matchesCity &&
      matchesDate &&
      matchesKeywords &&
      matchesContract
    );
  });

  // Handle job card click
  const handleJobClick = (jobId: string) => {
    if (isDesktop) {
      setSelectedJobId(jobId);
    } else {
      router.push(`/annonce-details/${jobId}`);
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
          <div
            key={job.id}
            onClick={() => handleJobClick(job.id)}
            className="cursor-pointer"
          >
            <JobCard job={job} isSelected={job.id === selectedJobId} />
          </div>
        ))}

        {filteredJobs.length === 0 && (
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
