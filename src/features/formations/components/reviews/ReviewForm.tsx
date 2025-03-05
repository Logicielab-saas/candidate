/**
 * ReviewForm - Course review submission form
 *
 * Allows users to submit reviews with ratings and comments
 *
 * Props:
 * - courseId: string - The ID of the course being reviewed
 * - onSubmit: (rating: number, comment: string) => void - Submit handler
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface ReviewFormProps {
  _courseId: string;
  onSubmit: (rating: number, comment: string) => void;
}

export function ReviewForm({ _courseId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(rating, comment);
      // Reset form
      setRating(0);
      setComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className="rounded-md p-1 hover:bg-accent"
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(value)}
            >
              <Star
                className={cn(
                  "h-6 w-6 transition-colors",
                  (hoverRating ? value <= hoverRating : value <= rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium">
          Your Review
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this course..."
          className="min-h-[100px] resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={rating === 0 || comment.length < 10 || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
