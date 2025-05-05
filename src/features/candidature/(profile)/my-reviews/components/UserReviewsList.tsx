/**
 * UserReviewsList - List of user reviews with filtering and sorting
 *
 * Client component managing the display and interaction with user reviews
 */

"use client";

import { useState } from "react";
import { CompanyReview } from "@/core/interfaces";
import { UserReviewCard } from "./UserReviewCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface UserReviewsListProps {
  initialReviews: CompanyReview[];
}

export function UserReviewsList({ initialReviews }: UserReviewsListProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("recent");
  const tCommon = useTranslations("common");

  const handleDeleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== reviewId));
  };

  const filteredAndSortedReviews = reviews
    .filter((review) => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        review.summary.toLowerCase().includes(searchLower) ||
        review.comment.toLowerCase().includes(searchLower) ||
        review.positivePoints?.some((point) =>
          point.toLowerCase().includes(searchLower)
        ) ||
        review.negativePoints?.some((point) =>
          point.toLowerCase().includes(searchLower)
        )
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating_high":
          return b.rating - a.rating;
        case "rating_low":
          return a.rating - b.rating;
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        default: // recent
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="search-reviews">
            {tCommon("reviews.search.label")}
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-reviews"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tCommon("reviews.search.placeholder")}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full sm:w-[200px] space-y-1.5">
          <Label>{tCommon("reviews.sort.label")}</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder={tCommon("reviews.sort.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">
                {tCommon("reviews.sort.options.recent")}
              </SelectItem>
              <SelectItem value="oldest">
                {tCommon("reviews.sort.options.oldest")}
              </SelectItem>
              <SelectItem value="rating_high">
                {tCommon("reviews.sort.options.rating_high")}
              </SelectItem>
              <SelectItem value="rating_low">
                {tCommon("reviews.sort.options.rating_low")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.length === 0 ? (
          <div className="text-center p-8 border rounded-lg">
            <p className="text-muted-foreground">
              {searchQuery
                ? tCommon("reviews.empty.noResults")
                : tCommon("reviews.empty.noReviews")}
            </p>
          </div>
        ) : (
          filteredAndSortedReviews.map((review) => (
            <UserReviewCard
              key={review.id}
              review={review}
              onDelete={handleDeleteReview}
            />
          ))
        )}
      </div>
    </div>
  );
}
