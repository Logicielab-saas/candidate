/**
 * ReviewCard - Individual review display component
 *
 * Displays a single course review with user info, rating, and helpful button
 *
 * Props:
 * - review: CourseReview - The review to display
 * - onHelpfulToggle: (reviewId: string) => void - Callback when helpful is toggled
 */

"use client";

import { CourseReview } from "@/core/interfaces/course-review.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface ReviewCardProps {
  review: CourseReview;
  onHelpfulToggle: (reviewId: string) => void;
}

export function ReviewCard({ review, onHelpfulToggle }: ReviewCardProps) {
  const initials = review.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={review.userAvatar} alt={review.userName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{review.userName}</h4>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-2 text-muted-foreground",
            review.isHelpful && "text-primary"
          )}
          onClick={() => onHelpfulToggle(review.id)}
        >
          <ThumbsUp
            className={cn(
              "h-4 w-4",
              review.isHelpful && "fill-primary text-primary"
            )}
          />
          <span>{review.helpful}</span>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">{review.comment}</p>
    </div>
  );
}
