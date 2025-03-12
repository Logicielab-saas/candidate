import { cn } from "@/lib/utils";
import { CompaniesReviewsHeader } from "@/features/companies-reviews/components/CompaniesReviewsHeader";
import { CompaniesGrid } from "@/features/companies-reviews/components/CompaniesGrid";

/**
 * CompaniesReviewsPage - Main page for company reviews
 *
 * Displays a list of company reviews with search and filtering capabilities
 */
export default function CompaniesReviewsPage() {
  return (
    <div className={cn("bg-background", "min-h-screen")}>
      <div className={cn("mx-auto max-w-7xl", "px-4 sm:px-6 lg:px-8 pt-10")}>
        {/* Header Section with search and filters */}
        <CompaniesReviewsHeader />

        {/* Companies Grid */}
        <CompaniesGrid />
      </div>
    </div>
  );
}
