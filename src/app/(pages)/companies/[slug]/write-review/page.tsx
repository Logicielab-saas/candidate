/**
 * WriteReviewPage - Company review page
 *
 * Page component for submitting company reviews.
 */

import { WriteReviewForm } from "@/features/companies/write-review/components/WriteReviewForm";

export default function WriteReviewPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-8">
      <div className="container max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Écrire un avis</h1>
          <p className="text-muted-foreground">
            Partagez votre expérience pour aider les autres à prendre de
            meilleures décisions de carrière
          </p>
        </div>
        <WriteReviewForm />
      </div>
    </div>
  );
}
