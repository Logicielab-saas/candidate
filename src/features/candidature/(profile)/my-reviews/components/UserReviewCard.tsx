/**
 * UserReviewCard - Individual user review card component
 *
 * Displays a user's review with company information and review details
 */

"use client";

import { CompanyReview } from "@/core/interfaces";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { companyDetails } from "@/core/mockData/company";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/core/utils/date";

interface UserReviewCardProps {
  review: CompanyReview;
  onDelete: (reviewId: string) => void;
}

export function UserReviewCard({ review, onDelete }: UserReviewCardProps) {
  const { toast } = useToast();
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const company = companyDetails.find((c) => c.slug === review.companySlug);

  const handleDelete = () => {
    onDelete(review.id);
    toast({
      title: tCommon("reviews.deleteDialog.title"),
      description: tCommon("reviews.deleteSuccess"),
    });
  };

  if (!company) return null;

  return (
    <div className="border rounded-lg bg-card">
      {/* Company Info Header */}
      <div className="p-6 border-b">
        <Link
          href={`/companies/${company.slug}`}
          className="text-xl font-semibold hover:text-primary transition-colors"
        >
          {company.name}
        </Link>
      </div>

      {/* Review Content */}
      <div className="p-6 space-y-4">
        {/* Rating and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-primary text-primary mr-1" />
              <span className="font-medium">{review.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {formatDate(review.createdAt, "d MMMM yyyy", locale)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive hover:text-destructive/90" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {tCommon("reviews.deleteDialog.title")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {tCommon("reviews.deleteDialog.description")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {tCommon("actions.cancel")}
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {tCommon("actions.delete")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Review Summary and Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            {review.summary}
          </h3>
          <p className="text-sm">{review.comment}</p>

          {/* Positive Points */}
          {review.positivePoints && review.positivePoints.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-green-600">
                {tCommon("reviews.sections.positivePoints")}
              </h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {review.positivePoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Negative Points */}
          {review.negativePoints && review.negativePoints.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-red-600">
                {tCommon("reviews.sections.negativePoints")}
              </h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {review.negativePoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
