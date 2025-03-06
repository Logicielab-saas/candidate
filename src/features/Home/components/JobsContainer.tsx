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
import { tabsListStyles, tabTriggerStyles } from "@/core/styles/tabs";
import { Separator } from "@/components/ui/separator";
import { JobFilters } from "./JobFilters";
import { useRecentSearchesStore } from "../store/recent-searches.store";

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
    <div className="space-y-6 mt-5">
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
            className={cn(tabsListStyles.wrapper, "bg-transparent p-0")}
          >
            <TabsTrigger value="recommended" className={tabTriggerStyles.base}>
              Recommended Jobs
            </TabsTrigger>
            <TabsTrigger value="recent" className={tabTriggerStyles.base}>
              Recent Searches
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
