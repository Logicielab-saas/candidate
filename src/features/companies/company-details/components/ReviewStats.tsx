/**
 * ReviewStats - Company review statistics component
 *
 * Displays overall rating statistics and rating distribution
 */

"use client";

import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CompanyReview } from "@/core/interfaces";

interface ReviewStatsProps {
  reviews: CompanyReview[];
}

export function ReviewStats({ reviews }: ReviewStatsProps) {
  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Calculate rating distribution
  const distribution = Array.from({ length: 5 }, (_, i) => {
    const rating = 5 - i;
    const count = reviews.filter(
      (review) => Math.floor(review.rating) === rating
    ).length;
    const percentage = (count / reviews.length) * 100;
    return { rating, count, percentage };
  });

  return (
    <div className="border rounded-lg p-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <h3 className="text-lg font-semibold">Note globale</h3>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">
              {averageRating.toFixed(1)}
            </span>
            <Star className="h-8 w-8 fill-primary text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Basé sur{" "}
            <span className="text-primaryHex-900 font-semibold">
              {reviews.length} avis
            </span>
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-3">
          {distribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-20">
                <span>{rating}</span>
                <Star className="h-4 w-4 fill-primary text-primary" />
              </div>
              <Progress value={percentage} className="flex-1" />
              <span className="text-sm text-muted-foreground w-12">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
