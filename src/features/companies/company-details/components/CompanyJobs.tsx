/**
 * CompanyJobs - Displays a company's job listings in a scrollable area
 *
 * Features:
 * - Scrollable job listings
 * - Direct navigation to job details page
 * - Search functionality for company jobs
 * - City & search filtering with URL state management
 * - Reuses existing JobCard component with modified behavior
 */

"use client";

import { mockJobsList } from "@/core/mockData/jobs-list";
import { JobCard } from "@/features/Home/components/JobCard";
import { useRouter } from "next/navigation";
import { CompanyDetails } from "@/core/interfaces";
import { useState } from "react";
import { SearchInput } from "@/features/Home/components/SearchInput";
import { CitySelector } from "@/features/Home/components/CitySelector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";

interface CompanyJobsProps {
  company: CompanyDetails;
}

export function CompanyJobs({ company }: CompanyJobsProps) {
  const router = useRouter();

  // Local state for form inputs
  const [inputText, setInputText] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // URL state management
  const [searchText, setSearchText] = useQueryState("q", {
    history: "push",
  });
  const [urlCity, setUrlCity] = useQueryState("city", {
    history: "push",
  });

  // Filter jobs for this company
  const companyJobs = mockJobsList.filter((job) => {
    const isCompanyJob = job.companyName === company.name;
    const matchesCity =
      !urlCity || job.city.toLowerCase() === urlCity.toLowerCase();

    if (!searchText) return isCompanyJob && matchesCity;

    const searchLower = searchText.toLowerCase();
    return (
      isCompanyJob &&
      matchesCity &&
      (job.jobTitle.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.keyWords.some((keyword) =>
          keyword.toLowerCase().includes(searchLower)
        ))
    );
  });

  const handleJobSelect = (jobId: string) => {
    router.push(`/annonce-details/${jobId}`);
  };

  const handleSearch = () => {
    // Update URL parameters
    setSearchText(inputText || null);
    setUrlCity(selectedCity);
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6 bg-background">
        <div
          className={cn(
            "max-w-5xl mx-auto",
            "flex flex-col sm:flex-row",
            "gap-4",
            "items-end",
            "justify-center"
          )}
        >
          <SearchInput value={inputText} onChange={setInputText} />
          <CitySelector value={selectedCity} onChange={setSelectedCity} />
          <Button
            onClick={handleSearch}
            size="lg"
            className="w-full sm:w-[120px] bg-primary hover:bg-primary/90"
          >
            Rechercher
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Available Positions</h2>
        <span className="text-sm text-muted-foreground">
          {companyJobs.length} jobs found
        </span>
      </div>

      <div className="max-h-[500px] overflow-auto">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {companyJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => handleJobSelect(job.id)}
                className="cursor-pointer"
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>

          {companyJobs.length === 0 && (
            <div className="text-center p-8 border rounded-lg">
              <p className="text-muted-foreground">
                {searchText || urlCity
                  ? "No jobs match your search criteria."
                  : "No job openings available at this time."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
