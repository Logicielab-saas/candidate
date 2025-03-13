/**
 * ReviewSummary - Review title/summary input component
 *
 * Allows users to provide a concise summary or title for their review.
 */

"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ReviewFormValues } from "../types";

interface ReviewSummaryProps {
  form: UseFormReturn<ReviewFormValues>;
}

export function ReviewSummary({ form }: ReviewSummaryProps) {
  return (
    <FormField
      control={form.control}
      name="summary"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">
            Résumé de l&apos;avis <span className="text-destructive">*</span>
          </FormLabel>
          <div className="text-sm text-muted-foreground mb-2">
            Donnez un bref titre qui résume vos principales impressions
          </div>
          <FormControl>
            <Input
              placeholder="Excellente culture d'entreprise et équilibre travail-vie personnelle"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
