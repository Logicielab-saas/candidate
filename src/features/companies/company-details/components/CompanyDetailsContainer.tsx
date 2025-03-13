"use client";

import { CompanyDetails } from "@/core/interfaces";
import { CompanyDetailsHeader } from "./CompanyDetailsHeader";
import { CompanyOverview } from "./CompanyOverview";
import { CompanyJobs } from "./CompanyJobs";
import { CompanyReviews } from "./CompanyReviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabTriggerStyles } from "@/core/styles/tabs";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";

interface CompanyDetailsContainerProps {
  company: CompanyDetails;
}

export function CompanyDetailsContainer({
  company,
}: CompanyDetailsContainerProps) {
  const [selectedTab, setSelectedTab] = useQueryState("tab", {
    defaultValue: "overview",
  });

  return (
    <div className="space-y-6 py-8">
      <CompanyDetailsHeader company={company} />
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 bg-transparent">
          <TabsTrigger value="overview" className={cn(tabTriggerStyles.home)}>
            Vue d&apos;ensemble
          </TabsTrigger>
          <TabsTrigger value="jobs" className={cn(tabTriggerStyles.home)}>
            Offres
          </TabsTrigger>
          <TabsTrigger value="reviews" className={cn(tabTriggerStyles.home)}>
            Avis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <CompanyOverview company={company} />
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <CompanyJobs company={company} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <CompanyReviews company={company} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
