/**
 * MyJobsContainer - Parent component that manages all job-related state
 *
 * This component is responsible for:
 * 1. Centralizing state management for all job-related data
 * 2. Managing tab navigation with URL state
 * 3. Providing handlers for all job operations (bookmark, archive, status updates)
 * 4. Filtering and passing data to child components
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
import type { Job, CandidateStatus } from "@/core/types";
import type { Interview } from "@/core/interfaces/";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Types and interfaces
interface JobTab {
  id: string;
  label: string;
  count: number;
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

  // Centralized state management for all jobs and interviews
  const [jobs, setJobs] = useState<Job[]>(mockSentApplications);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);

  // Derived states - Filter jobs based on different criteria
  const savedJobs = jobs.filter((job) => job.bookmarked);
  const sentApplications = jobs.filter(
    (job) => job.statuses.userJobStatus.status !== "ARCHIVED"
  );
  const archivedJobs = jobs.filter(
    (job) => job.statuses.userJobStatus.status === "ARCHIVED"
  );

  /**
   * Updates the status of a job application
   * This is used for various status changes including archiving and withdrawing
   */
  const handleUpdateStatus = (jobId: string, newStatus: CandidateStatus) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) => {
        if (job.jobKey === jobId) {
          const now = Date.now();
          return {
            ...job,
            statuses: {
              ...job.statuses,
              candidateStatus: {
                status: newStatus,
                timestamp: now,
              },
              selfReportedStatus: {
                status: newStatus,
                timestamp: now,
              },
              userJobStatus: {
                ...job.statuses.userJobStatus,
                status: newStatus === "ARCHIVED" ? "ARCHIVED" : "POST_APPLY",
              },
            },
          };
        }
        return job;
      })
    );
  };

  /**
   * Removes a job from bookmarks
   */
  const handleRemoveBookmark = (jobId: string) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.jobKey === jobId ? { ...job, bookmarked: false } : job
      )
    );
  };

  /**
   * Archives a job application
   * This is a wrapper around handleUpdateStatus
   */
  const handleArchive = (jobId: string) => {
    handleUpdateStatus(jobId, "ARCHIVED");
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

  // Tab configuration with dynamic counts
  const jobTabs: JobTab[] = [
    {
      id: "saved-jobs",
      label: "Emplois enregistrés",
      count: savedJobs.length,
    },
    {
      id: "sent-applications",
      label: "Candidatures envoyées",
      count: sentApplications.length,
    },
    {
      id: "interviews",
      label: "Entretiens",
      count: interviews.length,
    },
    {
      id: "archived",
      label: "Archivées",
      count: archivedJobs.length,
    },
  ];

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
                  <TabCounter count={tab.count} />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-6">
          <TabsContent value="saved-jobs">
            <SavedJobsList
              jobs={savedJobs}
              onRemoveBookmark={handleRemoveBookmark}
            />
          </TabsContent>

          <TabsContent value="sent-applications">
            <SentApplicationsList
              applications={sentApplications}
              onUpdateStatus={handleUpdateStatus}
              onArchive={handleArchive}
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
