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

interface JobTab {
  id: string;
  label: string;
  count: number;
}

const jobTabs: JobTab[] = [
  {
    id: "saved-jobs",
    label: "Emplois enregistrés",
    count: 23,
  },
  {
    id: "sent-applications",
    label: "Candidatures envoyées",
    count: 4,
  },
  {
    id: "interviews",
    label: "Entretiens",
    count: 0,
  },
  {
    id: "archived",
    label: "Archivées",
    count: 0,
  },
];

function TabCounter({ count }: { count: number }) {
  return <span className={tabCounterStyles.base}>{count}</span>;
}

interface MyJobsContainerProps {
  className?: string;
}

export function MyJobsContainer({ className }: MyJobsContainerProps) {
  return (
    <div className={cn("space-y-6 w-full", className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mes emplois</h1>
      </div>

      <Tabs defaultValue="saved-jobs" className="w-full">
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
