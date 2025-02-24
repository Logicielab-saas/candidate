"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  tabTriggerStyles,
  tabsListStyles,
  tabCounterStyles,
} from "@/core/styles/tabs";
import { SavedJobsList } from "./saved-jobs/SavedJobsList";

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
    id: "my-jobs",
    label: "Mes emplois",
    count: 0,
  },
  {
    id: "applications",
    label: "Candidatures envoyées",
    count: 0,
  },
  {
    id: "interviews",
    label: "Entretiens",
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

          <TabsContent value="my-jobs">
            <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
              Contenu Mes emplois
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
              Contenu Candidatures envoyées
            </div>
          </TabsContent>

          <TabsContent value="interviews">
            <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
              Contenu Entretiens
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
