import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { CompaniesSearch } from "./CompaniesSearch";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * CompaniesReviewsHeader - Header section for the companies reviews page
 *
 * Contains the main title, description, and search functionality
 * Uses server component for static content and wraps client components in Suspense
 */
export function CompaniesReviewsHeader() {
  return (
    <section className="space-y-6 pb-8 pt-4">
      <div className="text-center space-y-4">
        <h1
          className={cn(
            "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl",
            "bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text",
            "animate-in fade-in duration-1000"
          )}
        >
          Avis d&apos;Entreprises
        </h1>
        <p
          className={cn(
            "mx-auto max-w-[42rem]",
            "text-muted-foreground sm:text-xl",
            "leading-normal",
            "animate-in fade-in duration-1000 delay-200"
          )}
        >
          Découvrez les expériences authentiques des employés et prenez des
          décisions éclairées pour votre carrière
        </p>
      </div>

      {/* Search Section */}
      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-end justify-center">
              <Skeleton className="h-10 w-[500px]" />
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        }
      >
        <CompaniesSearch />
      </Suspense>
    </section>
  );
}
