/**
 * MyJobsContainer - Parent component that manages all job-related state
 *
 * This component is responsible for:
 * 1. Centralizing state management for all job-related data including API calls
 * 2. Managing tab navigation with URL state
 * 3. Providing handlers for all job operations (bookmark, archive, status updates)
 * 4. Fetching all data in parallel using Promise.all
 * 5. Filtering and passing data to child components
 */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  tabTriggerStyles,
  tabsListStyles,
  tabCounterStyles,
} from "@/core/styles/tabs";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { mockInterviews } from "@/core/mockData/jobs";
import type { Interview } from "@/core/interfaces/";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTabsCountStore } from "./store/tabs-count.store";
import { useFetchSavedEmplois } from "./hooks/use-my-saved-jobs";
import { useFetchSentApplications } from "./hooks/use-my-applied-jobs";
import { useFetchArchivedJobs } from "./hooks/use-my-archived-jobs";
import dynamic from "next/dynamic";

const SavedJobsList = dynamic(() => import("./saved-jobs/SavedJobsList"), {
  ssr: false,
});

const SentApplicationsList = dynamic(
  () => import("./sent-applications/SentApplicationsList"),
  {
    ssr: false,
  }
);

const ArchivedJobsList = dynamic(
  () => import("./archived-jobs/ArchivedJobsList"),
  {
    ssr: false,
  }
);

const InterviewsList = dynamic(() => import("./interviews/InterviewsList"), {
  ssr: false,
});

// Types and interfaces
interface JobTab {
  id: string;
  label: string;
  countKey: keyof Pick<
    ReturnType<typeof useTabsCountStore.getState>,
    | "savedJobsCount"
    | "sentApplicationsCount"
    | "interviewsCount"
    | "archivedCount"
  >;
}

function TabCounter({ count }: { count: number }) {
  return <span className={tabCounterStyles.base}>{count}</span>;
}

interface MyJobsContainerProps {
  className?: string;
}

export function MyJobsContainer({ className }: MyJobsContainerProps) {
  // URL state management for active tab
  const [activeTab, setActiveTab] = useQueryState<string>("tab", {
    defaultValue: "saved-jobs",
    parse: (value) => value || "saved-jobs",
  });

  // URL query state for pagination - shared by all tabs
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

  // Get tab counts from the store
  const {
    savedJobsCount,
    sentApplicationsCount,
    interviewsCount,
    archivedCount,
  } = useTabsCountStore();

  // Centralized data fetching for all job types
  const {
    data: savedJobsData,
    isLoading: isSavedJobsLoading,
    error: savedJobsError,
  } = useFetchSavedEmplois(page, perPage);

  const {
    data: sentApplicationsData,
    isLoading: isSentApplicationsLoading,
    error: sentApplicationsError,
  } = useFetchSentApplications(page, perPage);

  const {
    data: archivedJobsData,
    isLoading: isArchivedJobsLoading,
    error: archivedJobsError,
  } = useFetchArchivedJobs(page, perPage);

  // Combined loading state
  const _isLoading =
    isSavedJobsLoading || isSentApplicationsLoading || isArchivedJobsLoading;

  // Centralized state management for mock data (interviews only)
  const [interviews] = useState<Interview[]>(mockInterviews);

  // Handle page change function to be passed to child components
  const handlePageChange = (newPage: number) => {
    setPageStr(newPage.toString());

    // Scroll to top of the list when page changes
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Tab configuration with count keys for the store
  const jobTabs: JobTab[] = [
    {
      id: "saved-jobs",
      label: "Emplois enregistrés",
      countKey: "savedJobsCount",
    },
    {
      id: "sent-applications",
      label: "Candidatures envoyées",
      countKey: "sentApplicationsCount",
    },
    {
      id: "interviews",
      label: "Entretiens",
      countKey: "interviewsCount",
    },
    {
      id: "archived",
      label: "Archivés",
      countKey: "archivedCount",
    },
  ];

  // Map of count keys to actual counts
  const countMap = {
    savedJobsCount,
    sentApplicationsCount,
    interviewsCount,
    archivedCount,
  };

  return (
    <div className={cn("space-y-6 w-full", className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mes emplois</h1>
      </div>

      {/* Tab navigation with filtered data passed to each tab panel */}
      <Tabs
        defaultValue={activeTab as string}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <ScrollArea className="w-full">
          <div className={tabsListStyles.wrapper}>
            <TabsList className={tabsListStyles.base}>
              {jobTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={tabTriggerStyles.base}
                >
                  {tab.label}
                  <TabCounter count={countMap[tab.countKey]} />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-6">
          <TabsContent value="saved-jobs">
            {activeTab === "saved-jobs" && (
              <SavedJobsList
                savedJobsData={savedJobsData}
                isLoading={isSavedJobsLoading}
                error={savedJobsError}
                onPageChange={handlePageChange}
              />
            )}
          </TabsContent>

          <TabsContent value="sent-applications">
            {activeTab === "sent-applications" && (
              <SentApplicationsList
                sentApplicationsData={sentApplicationsData}
                isLoading={isSentApplicationsLoading}
                error={sentApplicationsError}
                onPageChange={handlePageChange}
              />
            )}
          </TabsContent>

          <TabsContent value="interviews">
            {activeTab === "interviews" && (
              <InterviewsList interviews={interviews} />
            )}
          </TabsContent>

          <TabsContent value="archived">
            {activeTab === "archived" && (
              <ArchivedJobsList
                archivedJobs={archivedJobsData}
                isLoading={isArchivedJobsLoading}
                error={archivedJobsError}
                onPageChange={handlePageChange}
              />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
