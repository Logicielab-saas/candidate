"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";

// Mock data for jobs
const JOBS_OPTIONS = [
  { label: "Social Media Manager", value: "social-media" },
  { label: "Graphiste", value: "graphiste" },
  { label: "Stage UI/UX", value: "ui-ux" },
];

// Mock data for messages
const MOCK_MESSAGES = [
  {
    id: 1,
    jobTitle: "Appel à candidature pour l'emploi « Social Media Manager »",
    jobType: "social-media",
    date: "14 Mars 2025",
    candidate: "Meryem AZELMAD",
    preview: "Bonjour meryem, Je vous re...",
    isUnread: true,
  },
  {
    id: 2,
    jobTitle: "Appel à candidature pour l'emploi « Graphiste »",
    jobType: "graphiste",
    date: "23 Juin 2025",
    candidate: "Mohammed LAKHDAR",
    preview: "Bonjour, Je vous ai envoyé...",
    isUnread: false,
  },
  {
    id: 3,
    jobTitle: "Appel à candidature pour l'emploi « Stage UI/UX »",
    jobType: "ui-ux",
    date: "31 Août 2024",
    candidate: "BASSMA MOUHADI",
    preview: "Bonjour, I hope this message...",
    isUnread: true,
  },
] as const;

export function MessagesList() {
  const [currentTab, setCurrentTab] = useState<"all" | "unread">("all");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const filteredMessages = MOCK_MESSAGES.filter((message) => {
    const matchesTab = currentTab === "all" || message.isUnread;
    const matchesJobs =
      selectedJobs.length === 0 || selectedJobs.includes(message.jobType);
    return matchesTab && matchesJobs;
  });

  return (
    <div className="border border-border rounded-lg bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border space-y-4">
        {/* Status and Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-muted-foreground">En ligne</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({filteredMessages.length}) messages
          </span>
        </div>

        {/* Message Tabs */}
        <Tabs
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value as "all" | "unread")}
        >
          <div className="w-full border-b border-secondaryHex-200 dark:border-secondaryHex-800">
            <TabsList className="flex h-10 w-full items-center gap-8 bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="relative h-full rounded-none border-b-2 border-transparent px-4 font-medium text-secondaryHex-600 dark:text-secondaryHex-400 outline-none ring-offset-background transition-colors hover:text-primaryHex-600 dark:hover:text-primaryHex-400 data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500 dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
              >
                Tous les messages
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="relative h-full rounded-none border-b-2 border-transparent px-4 font-medium text-secondaryHex-600 dark:text-secondaryHex-400 outline-none ring-offset-background transition-colors hover:text-primaryHex-600 dark:hover:text-primaryHex-400 data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500 dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
              >
                Non lus
                {MOCK_MESSAGES.filter((m) => m.isUnread).length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-primaryHex-100 dark:bg-primaryHex-900/30 text-primaryHex-700 dark:text-primaryHex-400 border-primaryHex-200 dark:border-primaryHex-800"
                  >
                    {MOCK_MESSAGES.filter((m) => m.isUnread).length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        {/* Filter MultiSelect */}
        <MultiSelect
          options={JOBS_OPTIONS}
          value={selectedJobs}
          onValueChange={setSelectedJobs}
          placeholder="Filtrer par emploi"
          className="h-8 w-full"
          contentClassName="min-w-[315px]"
        />
      </div>

      {/* Messages List */}
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="p-3">
          <div className="space-y-2">
            {filteredMessages.map((message) => (
              <button
                key={message.id}
                className={cn(
                  "w-full rounded-lg transition-colors",
                  "hover:bg-accent/50",
                  message.isUnread && "bg-accent/30"
                )}
              >
                <div className="p-3 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium line-clamp-1 text-foreground">
                      {message.jobTitle}
                    </p>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {message.date}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                      <span>{message.candidate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                      <span className="line-clamp-1">{message.preview}</span>
                    </div>
                  </div>
                  {message.isUnread && (
                    <div className="pt-1">
                      <Badge
                        variant="outline"
                        className="w-fit bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                      >
                        Nouveau message
                      </Badge>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
