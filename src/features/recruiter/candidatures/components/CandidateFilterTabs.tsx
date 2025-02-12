"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

interface CandidateTabsProps {
  className?: string;
}

// TODO: Replace with actual data from API
const tabsData = [
  { id: 1, value: "all", label: "Tous les candidats", count: 150 },
  { id: 2, value: "new", label: "Nouveaux", count: 25 },
  { id: 3, value: "encours", label: "En cours d'examen", count: 45 },
  { id: 4, value: "contacted", label: "Contactés", count: 1 },
  { id: 5, value: "interview", label: "En entretien", count: 30 },
  { id: 6, value: "hired", label: "Embauchés", count: 15 },
  { id: 7, value: "rejected", label: "Ecartés", count: 35 },
  { id: 8, value: "preselected", label: "Pré-sélectionnés", count: 10 },
  { id: 9, value: "adecider", label: "A décider", count: 10 },
];

export function CandidateFilterTabs({ className }: CandidateTabsProps) {
  return (
    <div className={cn("w-full", className)}>
      <Tabs defaultValue="all">
        <div className="w-full border-secondaryHex-200 dark:border-secondaryHex-800">
          <ScrollArea className="w-full">
            <TabsList className="flex h-12 w-fit items-center gap-8 bg-transparent p-0">
              {tabsData.map((tab, index) => (
                <Fragment key={tab.id}>
                  {index === 7 && (
                    <div className="h-8 w-px bg-secondaryHex-200 dark:bg-secondaryHex-700" />
                  )}
                  <TabsTrigger
                    value={tab.value}
                    className="relative h-full rounded-none border-b-2 border-transparent px-4 font-medium text-secondaryHex-600 dark:text-secondaryHex-400 outline-none ring-offset-background transition-colors hover:text-primaryHex-600 dark:hover:text-primaryHex-400 data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500 dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
                  >
                    <span className="flex flex-col items-center gap-1">
                      <span>{tab.label}</span>
                      <span className="text-xs font-normal">({tab.count})</span>
                    </span>
                  </TabsTrigger>
                </Fragment>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}
