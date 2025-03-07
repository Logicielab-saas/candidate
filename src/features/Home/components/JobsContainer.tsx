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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RecentSearches } from "./RecentSearches";
import { Separator } from "@/components/ui/separator";
import { JobFilters } from "./JobFilters";
import { useRecentSearchesStore } from "../store/recent-searches.store";
import { Pin, Zap } from "lucide-react";

// TODO: Maybe Export styles of the tabs and the tabs list

export function JobsContainer() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [, setJobId] = useQueryState("jobId");
  const [searchText] = useQueryState("q");
  const [selectedCity] = useQueryState("city");
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "recommended",
  });
  const addSearch = useRecentSearchesStore((state) => state.addSearch);

  // Clear jobId when switching to mobile
  useEffect(() => {
    if (!isDesktop) {
      setJobId(null);
    }
  }, [isDesktop, setJobId]);

  // Track searches in Zustand store
  useEffect(() => {
    // Only track when there's an actual search
    if (searchText || selectedCity) {
      addSearch(searchText || undefined, selectedCity || undefined);
    }
  }, [searchText, selectedCity, addSearch]);

  // Determine if there are any active search filters
  const hasActiveSearch = searchText || selectedCity;

  // Switch to recommended tab when searching
  useEffect(() => {
    if (hasActiveSearch) {
      setActiveTab("recommended");
    }
  }, [hasActiveSearch, setActiveTab]);

  return (
    <div className="space-y-6 mt-5 mb-5">
      {hasActiveSearch ? (
        <>
          <JobFilters />
          <Separator />
          <div className={cn("grid grid-cols-1 lg:grid-cols-5", "gap-8")}>
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
        </>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className={cn(
              "w-full border-secondaryHex-200 dark:border-secondaryHex-800",
              "bg-transparent p-0"
            )}
          >
            <TabsTrigger
              value="recommended"
              className={cn(
                "relative h-full rounded-none border-b-4 border-transparent",
                "px-4 font-medium",
                "text-secondaryHex-700 dark:text-secondaryHex-400",
                "outline-none ring-offset-background transition-colors",
                "hover:text-primaryHex-600 dark:hover:text-primaryHex-400",
                "data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-600",
                "dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
              )}
            >
              <Zap className="h-4 w-4 mr-2" /> Pour vous
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className={cn(
                "relative h-full rounded-none border-b-4 border-transparent",
                "px-4 font-medium",
                "text-secondaryHex-700 dark:text-secondaryHex-400",
                "outline-none ring-offset-background transition-colors",
                "hover:text-primaryHex-600 dark:hover:text-primaryHex-400",
                "data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-600",
                "dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
              )}
            >
              <Pin className="h-4 w-4 mr-2" />
              Les Recherches Récentes
            </TabsTrigger>
          </TabsList>
          <Separator />

          <TabsContent value="recommended" className="mt-6">
            <div className={cn("grid grid-cols-1 lg:grid-cols-5", "gap-8")}>
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
          </TabsContent>

          <TabsContent value="recent" className="mt-6">
            <div className={cn("grid grid-cols-1 mb-10", "gap-8")}>
              {/* Recent Searches Section */}
              <div className="lg:col-span-2 lg:border-r lg:pr-8">
                <RecentSearches />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
