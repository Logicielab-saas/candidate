/**
 * ReviewRating - Star rating input component
 *
 * Allows users to rate their experience with the company using a 5-star rating system.
 */

"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { ReviewFormValues } from "../types";

interface ReviewRatingProps {
  form: UseFormReturn<ReviewFormValues>;
}

export function ReviewRating({ form }: ReviewRatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  return (
    <FormField
      control={form.control}
      name="rating"
      render={({ field }) => (
        <FormItem className="text-center">
          <FormLabel className="text-lg font-semibold">
            Overall Rating <span className="text-destructive">*</span>
          </FormLabel>
          <div className="text-sm text-muted-foreground mb-2">
            How would you rate your overall experience with this company?
          </div>
          <FormControl>
            <div
              className="flex gap-1 justify-center"
              onMouseLeave={() => setHoveredRating(null)}
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => field.onChange(rating)}
                  onMouseEnter={() => setHoveredRating(rating)}
                  className={cn(
                    "p-1 hover:scale-110 transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "rounded-sm"
                  )}
                >
                  <Star
                    className={cn(
                      "w-8 h-8 transition-colors duration-200",
                      (
                        hoveredRating !== null
                          ? rating <= hoveredRating
                          : rating <= field.value
                      )
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted-foreground hover:fill-primary/20"
                    )}
                  />
                </button>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
