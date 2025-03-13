/**
 * ReviewComment - Detailed review textarea component
 *
 * Allows users to write a detailed review of their experience with the company.
 */

"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ReviewFormValues } from "../types";

interface ReviewCommentProps {
  form: UseFormReturn<ReviewFormValues>;
}

export function ReviewComment({ form }: ReviewCommentProps) {
  return (
    <FormField
      control={form.control}
      name="comment"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">
            Detailed Review <span className="text-destructive">*</span>
          </FormLabel>
          <div className="text-sm text-muted-foreground mb-2">
            Share your experience working at or interviewing with this company
          </div>
          <FormControl>
            <Textarea
              placeholder="Tell us about your experience..."
              className="min-h-[150px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
