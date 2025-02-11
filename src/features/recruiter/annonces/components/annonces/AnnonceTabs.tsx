"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface AnnonceTabsProps {
  activeTab: "active" | "closed";
  onTabChange: (_value: "active" | "closed") => void;
  className?: string;
}

export function AnnonceTabs({
  activeTab,
  onTabChange,
  className,
}: AnnonceTabsProps) {
  return (
    <div className={cn("w-full", className)}>
      <Tabs
        value={activeTab}
        onValueChange={(value) => onTabChange(value as "active" | "closed")}
      >
        <div className="w-full border-secondaryHex-200 dark:border-secondaryHex-800">
          <TabsList className="flex h-12 w-fit items-center gap-8 bg-transparent p-0">
            <TabsTrigger
              value="active"
              className="relative h-full rounded-none border-b-2 border-transparent px-4 font-medium text-secondaryHex-600 dark:text-secondaryHex-400 outline-none ring-offset-background transition-colors hover:text-primaryHex-600 dark:hover:text-primaryHex-400 data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500 dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
            >
              Emplois ouverts et suspendus
            </TabsTrigger>
            <TabsTrigger
              value="closed"
              className="relative h-full rounded-none border-b-2 border-transparent px-4 font-medium text-secondaryHex-600 dark:text-secondaryHex-400 outline-none ring-offset-background transition-colors hover:text-primaryHex-600 dark:hover:text-primaryHex-400 data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500 dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
            >
              Emplois fermés
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
