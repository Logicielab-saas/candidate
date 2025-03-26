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
import { SavedJobsList } from "./saved-jobs/SavedJobsList";
import { SentApplicationsList } from "./sent-applications/SentApplicationsList";
import { ArchivedJobsList } from "./archived-jobs/ArchivedJobsList";
import { InterviewsList } from "./interviews/InterviewsList";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { mockSentApplications } from "@/core/mockData/jobs";
import { mockInterviews } from "@/core/mockData/jobs";
import type { Job } from "@/core/types";
import type { Interview } from "@/core/interfaces/";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTabsCountStore } from "./store/tabs-count.store";
import { useFetchSavedEmplois } from "./hooks/use-my-saved-jobs";
import { useFetchSentApplications } from "./hooks/use-my-applied-jobs";

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

  // Combined loading state
  const _isLoading = isSavedJobsLoading || isSentApplicationsLoading;

  // Centralized state management for mock data (interviews & archive)
  const [jobs, setJobs] = useState<Job[]>(mockSentApplications);
  const [interviews, _setInterviews] = useState<Interview[]>(mockInterviews);

  const archivedJobs = jobs.filter(
    (job) => job.statuses.userJobStatus.status === "ARCHIVED"
  );

  // Handle page change function to be passed to child components
  const handlePageChange = (newPage: number) => {
    setPageStr(newPage.toString());

    // Scroll to top of the list when page changes
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * Unarchives a job application
   * Resets the status to APPLIED and moves it back to active applications
   */
  const handleUnarchive = (jobId: string) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) => {
        if (job.jobKey === jobId) {
          const now = Date.now();
          return {
            ...job,
            statuses: {
              ...job.statuses,
              candidateStatus: {
                status: "APPLIED",
                timestamp: now,
              },
              selfReportedStatus: {
                status: "APPLIED",
                timestamp: now,
              },
              userJobStatus: {
                ...job.statuses.userJobStatus,
                status: "POST_APPLY",
              },
            },
          };
        }
        return job;
      })
    );
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
      label: "Archivées",
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
            <SavedJobsList
              savedJobsData={savedJobsData}
              isLoading={isSavedJobsLoading}
              error={savedJobsError}
              onPageChange={handlePageChange}
            />
          </TabsContent>

          <TabsContent value="sent-applications">
            <SentApplicationsList
              sentApplicationsData={sentApplicationsData}
              isLoading={isSentApplicationsLoading}
              error={sentApplicationsError}
              onPageChange={handlePageChange}
            />
          </TabsContent>

          <TabsContent value="interviews">
            <InterviewsList interviews={interviews} />
          </TabsContent>

          <TabsContent value="archived">
            <ArchivedJobsList
              archivedJobs={archivedJobs}
              onUnarchive={handleUnarchive}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
