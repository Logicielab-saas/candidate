/**
 * RecentSearches - Component to display and manage recent job searches
 *
 * Tracks and displays user's recent search history including:
 * - Search terms
 * - Selected cities
 * - Timestamp of search
 */

"use client";

import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Clock, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RecentSearch {
  id: string;
  searchText?: string;
  city?: string;
  timestamp: Date;
}

const MAX_RECENT_SEARCHES = 5;

export function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [searchText] = useQueryState("q");
  const [selectedCity] = useQueryState("city");

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(
        JSON.parse(savedSearches).map((search: RecentSearch) => ({
          ...search,
          timestamp: new Date(search.timestamp),
        }))
      );
    }
  }, []);

  // Save new search when search parameters change
  useEffect(() => {
    if (searchText || selectedCity) {
      const newSearch: RecentSearch = {
        id: Date.now().toString(),
        searchText: searchText || undefined,
        city: selectedCity || undefined,
        timestamp: new Date(),
      };

      setRecentSearches((prev) => {
        // Remove duplicates and limit to MAX_RECENT_SEARCHES
        const updatedSearches = [
          newSearch,
          ...prev.filter(
            (search) =>
              search.searchText !== newSearch.searchText ||
              search.city !== newSearch.city
          ),
        ].slice(0, MAX_RECENT_SEARCHES);

        // Save to localStorage
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
        return updatedSearches;
      });
    }
  }, [searchText, selectedCity]);

  const handleClearSearch = (searchId: string) => {
    setRecentSearches((prev) => {
      const updatedSearches = prev.filter((search) => search.id !== searchId);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  if (recentSearches.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>No recent searches yet.</p>
        <p className="text-sm mt-2">
          Try searching for jobs by title, keyword, or location.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentSearches.map((search) => (
        <Card key={search.id} className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
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
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(search.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleClearSearch(search.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
