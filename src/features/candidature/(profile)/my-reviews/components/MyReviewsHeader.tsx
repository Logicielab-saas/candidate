/**
 * MyReviewsHeader - Header component for user reviews page
 *
 * Server component displaying the page title and summary of user's review activity
 */

interface MyReviewsHeaderProps {
  totalReviews: number;
}

export function MyReviewsHeader({ totalReviews }: MyReviewsHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Mes avis</h1>
      <div className="text-muted-foreground">
        {totalReviews === 0 ? (
          "Vous n'avez pas encore donné d'avis."
        ) : (
          <p>
            Vous avez donné{" "}
            <span className="text-primary"> {totalReviews} avis</span> au total.
          </p>
        )}
      </div>
    </div>
  );
}
