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
            Avis détaillé <span className="text-destructive">*</span>
          </FormLabel>
          <div className="text-sm text-muted-foreground mb-2">
            Partagez votre expérience de travail ou d&apos;entretien avec cette
            entreprise (30 caractères minimum, 200 caractères maximum)
          </div>
          <FormControl>
            <Textarea
              placeholder="Racontez-nous votre expérience..."
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
