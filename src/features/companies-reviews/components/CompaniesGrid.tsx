/**
 * CompaniesGrid - Container component for displaying company cards
 *
 * Server component that handles the layout and rendering of company cards
 * Uses grid layout for responsive display
 */

import { CompanyCard } from "./CompanyCard";
import { companyReviews } from "@/core/mockData/company";
import { cn } from "@/lib/utils";

export function CompaniesGrid() {
  return (
    <section className="mt-8">
      <div
        className={cn(
          "grid gap-4",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        {companyReviews.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  );
}
