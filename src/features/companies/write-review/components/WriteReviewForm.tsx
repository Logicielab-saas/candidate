/**
 * WriteReviewForm - Company review form container component
 *
 * Main form component for submitting company reviews. Handles form state management
 * and submission logic while delegating UI rendering to child components.
 */

"use client";

import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ReviewRating } from "./ReviewRating";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewComment } from "./ReviewComment";
import { ReviewPoints } from "./ReviewPoints";
import { toast } from "@/hooks/use-toast";
import { ReviewFormValues, reviewFormSchema } from "../types";

export function WriteReviewForm() {
  const pathname = usePathname();
  const companySlug = pathname.split("/")[2]; // Get company slug from URL

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      summary: "",
      comment: "",
      positivePoints: [],
      negativePoints: [],
    },
  });

  async function onSubmit(data: ReviewFormValues) {
    try {
      // TODO: Implement API call to submit review
      console.log("Form data:", { ...data, companySlug });
      toast({
        variant: "success",
        title: "Avis soumis avec succès",
        description: "Merci d'avoir partagé votre expérience !",
      });
    } catch (_error) {
      toast({
        title: "Erreur lors de la soumission",
        description: "Veuillez réessayer plus tard",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <ReviewRating form={form} />
          <ReviewSummary form={form} />
          <ReviewComment form={form} />
          <ReviewPoints form={form} />
        </div>

        <Button type="submit" className="w-full">
          Soumettre l&apos;avis
        </Button>
      </form>
    </Form>
  );
}
