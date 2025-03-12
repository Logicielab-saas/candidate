"use client";

import { CompanyDetails } from "@/core/interfaces";
import { CompanyDetailsHeader } from "./CompanyDetailsHeader";
import { CompanyOverview } from "./CompanyOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsListStyles, tabTriggerStyles } from "@/core/styles/tabs";
import { cn } from "@/lib/utils";

interface CompanyDetailsContainerProps {
  company: CompanyDetails;
}

export function CompanyDetailsContainer({
  company,
}: CompanyDetailsContainerProps) {
  return (
    <div className="space-y-6 py-8">
      <CompanyDetailsHeader company={company} />
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent">
          <TabsTrigger value="overview" className={cn(tabTriggerStyles.home)}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="jobs" className={cn(tabTriggerStyles.home)}>
            Jobs
          </TabsTrigger>
          <TabsTrigger value="reviews" className={cn(tabTriggerStyles.home)}>
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <CompanyOverview company={company} />
        </TabsContent>

        <TabsContent value="jobs">
          <div className="p-4">Jobs content coming soon...</div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="p-4">Reviews content coming soon...</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
