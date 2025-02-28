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
import { useEffect, useState } from "react";
import { mockSentApplications } from "@/core/mockData/jobs";
import { mockInterviews } from "@/core/mockData/jobs";

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
  const [activeTab, setActiveTab] = useQueryState<string>("tab", {
    defaultValue: "saved-jobs",
    parse: (value) => value || "saved-jobs",
  });

  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [sentApplicationsCount, setSentApplicationsCount] = useState(0);
  const [interviewsCount, setInterviewsCount] = useState(0);
  const [archivedJobsCount, setArchivedJobsCount] = useState(0);

  useEffect(() => {
    // Assuming these components expose a way to get the counts
    const savedJobs = mockSentApplications.filter(
      (job) => job.bookmarked
    ).length; // Replace with actual count logic
    const sentApplications = mockSentApplications.filter(
      (app) => app.statuses.userJobStatus.status !== "ARCHIVED"
    ).length; // Updated to exclude archived applications
    const interviews = mockInterviews.length; // Replace with actual count logic
    const archivedJobs = mockSentApplications.filter(
      (job) => job.statuses.userJobStatus.status === "ARCHIVED"
    ).length; // Replace with actual count logic

    setSavedJobsCount(savedJobs);
    setSentApplicationsCount(sentApplications);
    setInterviewsCount(interviews);
    setArchivedJobsCount(archivedJobs);
  }, []);

  const jobTabs: JobTab[] = [
    {
      id: "saved-jobs",
      label: "Emplois enregistrés",
      count: savedJobsCount,
    },
    {
      id: "sent-applications",
      label: "Candidatures envoyées",
      count: sentApplicationsCount,
    },
    {
      id: "interviews",
      label: "Entretiens",
      count: interviewsCount,
    },
    {
      id: "archived",
      label: "Archivées",
      count: archivedJobsCount,
    },
  ];

  return (
    <div className={cn("space-y-6 w-full", className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mes emplois</h1>
      </div>

      <Tabs
        defaultValue={activeTab as string}
        onValueChange={setActiveTab}
        className="w-full"
      >
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

        <div className="mt-6">
          <TabsContent value="saved-jobs">
            <SavedJobsList />
          </TabsContent>

          <TabsContent value="sent-applications">
            <SentApplicationsList />
          </TabsContent>

          <TabsContent value="interviews">
            <InterviewsList />
          </TabsContent>

          <TabsContent value="archived">
            <ArchivedJobsList />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
