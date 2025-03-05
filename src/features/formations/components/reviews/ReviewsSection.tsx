/**
 * ReviewsSection - Course reviews section component
 *
 * Manages the display and submission of course reviews
 *
 * Props:
 * - courseId: string - The ID of the course
 * - initialReviews: CourseReview[] - Initial reviews data
 */

"use client";

import { useState } from "react";
import { CourseReview } from "@/core/interfaces/course-review.interface";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReviewsSectionProps {
  courseId: string;
  initialReviews: CourseReview[];
}

type SortOption = "recent" | "helpful" | "highest" | "lowest";

export function ReviewsSection({
  courseId,
  initialReviews,
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const ratingCounts = reviews.reduce(
    (acc, review) => {
      acc[review.rating - 1]++;
      return acc;
    },
    [0, 0, 0, 0, 0]
  );

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    const sortedReviews = [...reviews];
    switch (value) {
      case "recent":
        sortedReviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "helpful":
        sortedReviews.sort((a, b) => b.helpful - a.helpful);
        break;
      case "highest":
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
    }
    setReviews(sortedReviews);
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    // In a real app, this would be an API call
    const newReview: CourseReview = {
      id: Math.random().toString(36).substr(2, 9),
      courseId,
      userId: "user-1", // This would come from auth
      userName: "John Doe", // This would come from auth
      rating,
      comment,
      createdAt: new Date().toISOString(),
      helpful: 0,
    };

    setReviews((prev) => [newReview, ...prev]);
    setIsReviewDialogOpen(false);
  };

  const handleHelpfulToggle = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              helpful: review.isHelpful
                ? review.helpful - 1
                : review.helpful + 1,
              isHelpful: !review.isHelpful,
            }
          : review
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header section with ratings and review button */}
      <div className="flex flex-col gap-6 rounded-lg border p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Course Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>
        </div>

        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Write a Review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
            <ReviewForm _courseId={courseId} onSubmit={handleReviewSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Rating distribution */}
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Rating Distribution</h3>
        <div className="space-y-3">
          {ratingCounts
            .map((count, index) => ({
              rating: 5 - index,
              count,
              percentage: (count / reviews.length) * 100,
            }))
            .map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2 text-sm">
                <div className="flex w-16 items-center gap-1">
                  <span>{rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="h-2 flex-1 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-right text-muted-foreground">
                  {count}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Reviews list with sort */}
      <div className="space-y-4">
        <div className="flex justify-end">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[600px] rounded-lg border p-6">
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onHelpfulToggle={handleHelpfulToggle}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
