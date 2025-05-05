/**
 * MyReviewsHeader - Header component for user reviews page
 *
 * Server component displaying the page title and summary of user's review activity
 */

import { useTranslations } from "next-intl";

interface MyReviewsHeaderProps {
  totalReviews: number;
}

export function MyReviewsHeader({ totalReviews }: MyReviewsHeaderProps) {
  const tCommon = useTranslations("common");

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{tCommon("reviews.title")}</h1>
      <div className="text-muted-foreground">
        {totalReviews === 0 ? (
          tCommon("reviews.empty.noReviews")
        ) : (
          <p>{tCommon("reviews.summary", { count: totalReviews })}</p>
        )}
      </div>
    </div>
  );
}
