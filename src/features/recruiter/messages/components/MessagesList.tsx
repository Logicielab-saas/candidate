"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageItem } from "./MessageItem";

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
    jobTitle: "A postulé pour « Social Media Manager »",
    jobType: "social-media",
    date: "Il y a 2 heures",
    candidate: {
      name: "Meryem AZELMAD",
      position: "Social Media Manager",
      city: "Casablanca",
    },
    preview:
      "Bonjour, Je suis très intéressée par le poste de Social Media Manager. J'ai 5 ans d'expérience dans le domaine et je souhaiterais...",
    isUnread: true,
  },
  {
    id: 2,
    jobTitle: "A postulé pour « Graphiste »",
    jobType: "graphiste",
    date: "Hier",
    candidate: {
      name: "Mohammed LAKHDAR",
      position: "Graphiste Senior",
      city: "Rabat",
    },
    preview:
      "Bonjour, Suite à notre entretien de la semaine dernière, je vous envoie comme convenu mon portfolio actualisé avec mes dernières réalisations...",
    isUnread: false,
  },
  {
    id: 3,
    jobTitle: "A postulé pour « Stage UI/UX »",
    jobType: "ui-ux",
    date: "Il y a 3 jours",
    candidate: {
      name: "BASSMA MOUHADI",
      position: "UI/UX Designer Junior",
      city: "Tanger",
    },
    preview:
      "Bonjour, Je suis actuellement en dernière année d'études en design numérique et je suis très intéressée par l'opportunité de stage...",
    isUnread: true,
  },
] as const;

export function MessagesList() {
  const [currentTab, setCurrentTab] = useState<"all" | "unread">("all");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = MOCK_MESSAGES.filter((message) => {
    const matchesTab = currentTab === "all" || message.isUnread;
    const matchesJobs =
      selectedJobs.length === 0 || selectedJobs.includes(message.jobType);
    const matchesSearch = searchQuery
      ? message.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.candidate.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        message.preview.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTab && matchesJobs && matchesSearch;
  });

  return (
    <Card className="border-border">
      <CardHeader className="p-4 space-y-4 border-b">
        {/* Status and Count */}
        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-help">
                  <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    En ligne
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Statut de connexion</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            {filteredMessages.length} messages
          </Badge>
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

        {/* Search and Filter Section */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8"
            />
          </div>

          <MultiSelect
            options={JOBS_OPTIONS}
            value={selectedJobs}
            onValueChange={setSelectedJobs}
            placeholder="Filtrer par emploi"
            className="h-8 w-full"
            contentClassName="min-w-[315px]"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="p-3">
            <div className="space-y-1">
              {filteredMessages.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  onClick={() => {
                    // Handle message click
                    console.log("Message clicked:", message.id);
                  }}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
