/**
 * CompanyReviews - Company reviews section
 *
 * Displays company reviews with search and sorting functionality
 */

"use client";

import { CompanyDetails } from "@/core/interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import { ReviewStats } from "./ReviewStats";
import { ReviewCard } from "./ReviewCard";
import { companyReviews } from "@/core/mockData/company";
import { MOCK_USERS } from "@/core/mockData/user";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface CompanyReviewsProps {
  company: CompanyDetails;
}

export function CompanyReviews({ company }: CompanyReviewsProps) {
  // URL state for filters
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [sortBy, setSortBy] = useQueryState("sort", {
    defaultValue: "recent",
  });

  // Local state for search input
  const [searchInput, setSearchInput] = useState(searchQuery || "");

  // Update local input when URL param changes
  useEffect(() => {
    setSearchInput(searchQuery || "");
  }, [searchQuery]);

  // Get company-specific reviews
  const companySpecificReviews = companyReviews.filter(
    (review) => review.companySlug === company.slug
  );

  // Filter and sort reviews
  const filteredReviews = companySpecificReviews
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

  const handleSearch = () => {
    setSearchQuery(searchInput || null);
  };

  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="border rounded-lg p-4 bg-background">
        <div
          className={cn(
            "max-w-5xl mx-auto",
            "flex flex-col sm:flex-row",
            "gap-3",
            "items-end",
            "justify-center"
          )}
        >
          <div className="w-full sm:w-[500px] space-y-1.5">
            <Label htmlFor="search-reviews">Rechercher des avis</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-reviews"
                placeholder="Rechercher par titre ou contenu..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full sm:w-[250px] space-y-1.5">
            <Label>Trier par</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récents</SelectItem>
                <SelectItem value="oldest">Plus anciens</SelectItem>
                <SelectItem value="rating_high">Note - Plus élevée</SelectItem>
                <SelectItem value="rating_low">Note - Plus basse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-[120px] space-y-1.5">
            <Label>&nbsp;</Label>
            <Button
              onClick={handleSearch}
              size="default"
              className="w-full bg-primary hover:bg-primary/90"
            >
              Rechercher
            </Button>
          </div>
        </div>
      </div>

      {/* Review Statistics */}
      <ReviewStats reviews={companySpecificReviews} />

      {/* Reviews List */}
      <div className="border rounded-lg bg-background">
        {filteredReviews.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-muted-foreground">
              {searchQuery
                ? "Aucun avis ne correspond à votre recherche."
                : "Aucun avis disponible pour le moment."}
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredReviews.map((review) => (
              <div key={review.id} className="px-6">
                <ReviewCard
                  review={review}
                  user={MOCK_USERS.find((user) => user.id === review.userId)!}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
