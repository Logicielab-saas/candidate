"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { AnnonceSelectFilter } from "./AnnonceSelectFilter"

interface AnnonceTabsProps {
  children?: React.ReactNode
  className?: string
}

export function AnnonceTabs({ children, className }: AnnonceTabsProps) {
  return (
    <Tabs defaultValue="active" className={cn("w-full space-y-6", className)}>
      <TabsList className="flex h-12 w-fit items-center gap-8 border-b border-secondaryHex-200 dark:border-secondaryHex-800 bg-transparent p-0">
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
      {/* Checkbox search filter for annonces */}
      <AnnonceSelectFilter />

      {/* Content for active jobs */}
      <TabsContent value="active">
        <div className="rounded-lg">
          <div>qq</div>
        </div>
      </TabsContent>
      {/* Content for closed jobs */}
      <TabsContent value="closed">
        <div className="rounded-lg">aa</div>
      </TabsContent>
    </Tabs>
  )
}
