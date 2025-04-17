/**
 * RecentSearches - Component to display and manage recent job searches
 *
 * Features:
 * - Displays recent searches with search terms and cities
 * - Shows timestamps for each search
 * - Allows removing individual searches
 * - Clickable searches to re-run them
 */

"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Clock, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useQueryState } from "nuqs";
import { useRecentSearchesStore } from "../store/recent-searches.store";
import { useTranslations } from "next-intl";

export function RecentSearches() {
  // Local state for form inputs
  const [, setSearchText] = useQueryState("q", {
    history: "push",
  });
  const [, setSelectedCity] = useQueryState("city", {
    history: "push",
  });
  const [, setJobId] = useQueryState("job");
  const { searches, removeSearch } = useRecentSearchesStore();

  const t = useTranslations("emplois.recentSearches");

  const handleSearchClick = (search: {
    searchText?: string;
    city?: string;
  }) => {
    setJobId(null);

    // Update search parameters using nuqs
    setSearchText(search.searchText || null);
    setSelectedCity(search.city || null);
  };

  if (searches.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>{t("noSearches")}</p>
        <p className="text-sm mt-2">{t("searchTip")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {searches.map((search) => (
        <Card
          key={search.id}
          className="p-4 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div
              className="space-y-2 flex-1 cursor-pointer"
              onClick={() => handleSearchClick(search)}
            >
              {search.searchText && (
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span>{search.searchText}</span>
                </div>
              )}
              {search.city && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{search.city}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(search.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:text-destructive"
              onClick={() => removeSearch(search.id)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{t("removeSearch")}</span>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
