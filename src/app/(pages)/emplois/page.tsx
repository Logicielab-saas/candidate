import { cn } from "@/lib/utils";
import { HomeHeader } from "@/features/Emplois/components/HomeHeader";
import { JobsContainer } from "@/features/Emplois/components/JobsContainer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LoaderOne from "@/components/ui/loader-one";
import { getTranslations } from "next-intl/server";

export default async function EmploisPage() {
  const t = await getTranslations("emplois.page");

  return (
    <div className="pt-10">
      {/* Header Section */}
      <div className="text-center space-y-3 mb-6">
        <h1
          className={cn(
            "text-4xl md:text-5xl font-bold",
            "tracking-tight",
            "bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text",
            "animate-in fade-in duration-1000"
          )}
        >
          {t("title")}
        </h1>
        <p
          className={cn(
            "text-lg text-muted-foreground",
            "max-w-2xl mx-auto",
            "animate-in fade-in duration-1000 delay-200"
          )}
        >
          {t("description")}
        </p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-end justify-center">
              <Skeleton className="h-10 w-[500px]" />
              <Skeleton className="h-10 w-[200px]" />
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        }
      >
        <HomeHeader />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <LoaderOne />
          </div>
        }
      >
        <JobsContainer />
      </Suspense>
    </div>
  );
}
